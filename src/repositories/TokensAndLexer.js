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
  '/': 'SLASH',
  '*': 'ASTERISK',
  '\'':　'quotation',
  '/\s/': 'WHITE',
  '<': 'GT',
  '>': 'LT',
  '!': 'NOT'
}
reserve = {}
keywords = {
  //型あり言語の想定
  'String': 'STR',
  'Int': 'INT',
  'Bollean': 'BOLLEAN',
  'func': 'FUNCTION',
  'true': 'TRUE',
  'false': 'FALSE',
  'if': 'IF',
  'else': 'ELSE',
  'for': 'FOR' ,
  'break': 'BREAK',
  'continue': 'CONTINUE',
  //ここからはwerewolfConfigの特徴keywords
  'VillageInfoSystem': 'VILLAGEINFOSYSTEM',
  'WereWolfConfigAction': 'WEREWOLFCONFIGACTION'

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
 getNextChar () {
   return this.nextChar
 }
 backChar () {
   this.position -= 1
 }
}
function isLetter(c) {
  return  !!c.match(/[A-Z]/g) || !!c.match(/[a-z]/g) || c=='_'
}
function isNumbers(c) {
  return  !!c.match(/[0-9]/g)
}
function isLetterandNumber(c) {
  return !!c.match(/[A-Z]/g) || !!c.match(/[a-z]/g) || c=='_' || !!c.match(/[0-9]/g)
}
function outputTokens(input) {
  outputTokens = { Tokens:[], literal:[]}
  let getCharcter = ''
  let strings = new characters(input)
  while(getCharcter !== 'tokenEnd') {

    getCharcter = strings.read()
    console.log(getCharcter)
    if (!!getCharcter.match(/\s/)) {
          console.log('WHITe', getCharcter)
          continue
      }
    if (Tokens.hasOwnProperty(getCharcter)) {
      // tokenにあるのか？
      if(!!getCharcter.match(/<|>|!|=/)) {
        //equalと親和性があるものたち
        const currentChar = getCharcter
        if (strings.getNextChar() == '=') {
          const nextChar = strings.read()
          const eps = getCharcter + nextChar
          const epsToken = Tokens[getCharcter] + '_EQ'
          outputTokens.literal.push(eps)
          outputTokens.Tokens.push(epsToken)
          continue
        }
      } else if(!!getCharcter.match(/\+|-/)) {
        //特殊な算術
        if (strings.getNextChar() == '=') {
        const epsToken = Tokens[getCharcter] + '_ASSIGN'
        const eps = getCharcter + strings.read()
        outputTokens.literal.push(eps)
        outputTokens.Tokens.push(epsToken)
        continue
      } else if(strings.getNextChar() === getCharcter){
          //デクリメント　&&　インクリメント
          const epsToken = Tokens[getCharcter] + Tokens[getCharcter]
          const eps = getCharcter + strings.read()
          outputTokens.literal.push(eps)
          outputTokens.Tokens.push(epsToken)
          continue
        }
      } else if (getCharcter !== 'tokenEnd') {
        outputTokens.Tokens.push(Tokens[getCharcter])
      }
    } else {
      //予約かkeywordかdontsettoken!か
      if (isLetter(getCharcter)) {
        //dontsettokenではないっぽい？
        console.log('getCharcter')
        let letter = ''
        while(isLetterandNumber(getCharcter) && !!getCharcter && getCharcter !== 'tokenEnd') {
          //　最初の文字以外は数字も可能だよね
          letter = letter + getCharcter

          getCharcter = strings.read()
          console.log('aa', getCharcter)
        }
        if (keywords.hasOwnProperty(letter)) {
          //keywordなのか？
          outputTokens.Tokens.push(keywords[letter])
        } else {
          //予約だよね！！
          let maybeKeyWord = outputTokens.literal[outputTokens.literal.length -  1]
          //多分これキーワード？(型宣言？)
          if (keywords.hasOwnProperty(maybeKeyWord)) {
            outputTokens.Tokens.push('Declare'+maybeKeyWord)
            reserve[letter] = maybeKeyWord
          } else if (maybeKeyWord === '\''){
            outputTokens.Tokens.push('literal'+'String')
          } else {
            outputTokens.Tokens.push('Declare'+'dont set token')
          }
        }
        outputTokens.literal.push(letter)
        strings.backChar()
        continue
      } else if (isNumbers(getCharcter)) {
        //numbersだな
        let numbers = ''
        while (isNumbers(getCharcter)) {
          console.log(getCharcter)
          numbers = numbers + getCharcter
          getCharcter = strings.read()
        }
        outputTokens.Tokens.push('literal' + 'Int') //int型のリテラル
        outputTokens.literal.push(numbers)
        strings.backChar()
        continue
      } else {
      outputTokens.Tokens.push('dont set token!')
      }
    }
    if (getCharcter !== 'tokenEnd') {
        outputTokens.literal.push(getCharcter)
    }
  }
  return outputTokens
}

module.exports = {outputTokens}
