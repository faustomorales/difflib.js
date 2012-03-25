{
  getCloseMatches,
  _countLeading,
  IS_LINE_JUNK,
  IS_CHARACTER_JUNK,
  _formatRangeUnified,
  unifiedDiff,
  _formatRangeContext
} = require '..'

suite 'global'

test '.getCloseMatches', ->
 getCloseMatches('appel', ['ape', 'apple', 'peach', 'puppy'])
   .should.eql ['apple', 'ape']
 
 KEYWORDS = require('coffee-script').RESERVED
 getCloseMatches('wheel', KEYWORDS).should.eql ['when', 'while']
 getCloseMatches('accost', KEYWORDS).should.eql ['const']

test '._countLeading', ->
  _countLeading('   abc', ' ').should.eql 3

test '.IS_LINE_JUNK', ->
  IS_LINE_JUNK('\n').should.be.true
  IS_LINE_JUNK('  #   \n').should.be.true
  IS_LINE_JUNK('hello\n').should.be.false

test '.IS_CHARACTER_JUNK', ->
  IS_CHARACTER_JUNK(' ').should.be.true
  IS_CHARACTER_JUNK('\t').should.be.true
  IS_CHARACTER_JUNK('\n').should.be.false
  IS_CHARACTER_JUNK('x').should.be.false

test '._formatRangeUnified', ->
  _formatRangeUnified(1, 2).should.eql '2'
  _formatRangeUnified(1, 3).should.eql '2,2'
  _formatRangeUnified(1, 4).should.eql '2,3'

test '.unifiedDiff', ->
  unifiedDiff('one two three four'.split(' '),
              'zero one tree four'.split(' '), {
                fromfile: 'Original'
                tofile: 'Current',
                fromfiledate: '2005-01-26 23:30:50',
                tofiledate: '2010-04-02 10:20:52',
                lineterm: ''
              }).should.eql [
    '--- Original\t2005-01-26 23:30:50',
    '+++ Current\t2010-04-02 10:20:52',
    '@@ -1,4 +1,4 @@',
    '+zero',
    ' one',
    '-two',
    '-three',
    '+tree',
    ' four'
  ]

test '._formatRangeContext', ->
  _formatRangeContext(1, 2).should.eql '2'
  _formatRangeContext(1, 3).should.eql '2,3'
  _formatRangeContext(1, 4).should.eql '2,4'