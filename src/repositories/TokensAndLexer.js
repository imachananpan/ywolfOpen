Tokens = {
  '=': 'ASSIGN',
  ';': 'SEMICOLON',
  '(': 'LPAREN',
  ')': 'RPAREN',
  '{': 'LBRACE',
  '}': 'RBRACE',
  'tokenEnd': 'EOF',
  '.': 'CONMA',
  '+': 'PLUS',
  '-': 'MINUS',
  '*': 'ZIYO',
  '/': 'WARU',
  '\'':　'quotation'
}
reserve = {}
keywords = {
  'String': 'STR',
  'Int': 'INT',
  'Bollean': 'BOLLEAN'
}
class characters{
  input = ''
  position = 0
  currentChar = ''
  nextChar = ''
 constructor (input) {
   this.input = input
   this.currentChar = input.length >= 1 ? input[0]:'tokenEnd'
   this.nextChar = input.length >=  2 ? input[1]:'tokenEnd'
 }
 read () {
   const popChar = this.input[this.position]
   if (popChar === ' ') {
     return 'tokenEnd'
   }
   console.log('pop', popChar, this.input.length, this.position + 1, this.input[this.position])
   if (this.position + 1 > this.input.length) {
     return 'tokenEnd'
   }
   if (this.position + 2 > this.input.length) {
     this.nextChar = 'tokenEnd'
   } else {
     this.nextChar = this.input[this.position + 1]
   }
   this.position += 1
   return this.input[this.position - 1]
 }
 getChar () {
   return this.currentChar
 }
}
function isLetter(c) {
  return  !!c.match(/[A-Z]/g) || !!c.match(/[a-z]/g) || c=='_'
}
function outputTokens(input) {
  outputTokens = { Tokens:[], literal:[]}
  let getCharcter = ''
  let strings = new characters(input)
  while(getCharcter !== 'tokenEnd') {
    getCharcter = strings.read()
    console.log(getCharcter)
    if (Tokens.hasOwnProperty(getCharcter)) {
      outputTokens.Tokens.push(Tokens[getCharcter])
    } else {
      //予約かkeywordかdontsettoken!か
      if (isLetter(getCharcter)) {
        //dontsettokenではないっぽい？
        console.log('getCharcter')
        let letter = ''
        while(isLetter(getCharcter)) {
          letter = letter + getCharcter
          getCharcter = strings.read()
        }
        if (keywords.hasOwnProperty(letter)) {
          //keywordなのか？
          outputTokens.Tokens.push(keywords[letter])
        } else {
          //予約だよね！！
          let maybeKeyWord = outputTokens.literal[outputTokens.literal.length -  1]
          //多分これキーワード？(型宣言？)
          outputTokens.Tokens.push('Declare'+maybeKeyWord)
        }
        outputTokens.literal.push(letter)
        continue
      } else {
      outputTokens.Tokens.push('dont set token!')
      }
    }
    outputTokens.literal.push(getCharcter)
  }
  return outputTokens
}
