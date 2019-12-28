const Token = require('./werewolfConfigToken.js').WerewolfConfigToken

class.WerewolfConfigLexer{
  position = 0
  NextChar = ''
  CurrentChar = ''
  Input = ''
  constructor(input) {
    if (typeof input === String) {
      this.Input = input
    }
  }
  nextToken () {
    let token = ''
    switch (this.CurrentChar) {
      case '=':
        token =  new Token('ASSIGN', this.CurrentChar)
        break
      case ';':
        token =  new Token('SEMICOLON', this.CurrentChar)
        break
      case '(':
        token = new Token('LPAREN', this.CurrentChar)
        break
      case ')':
        token = new Token('RPAREN', this.CurrentChar)
        break
      case '{':
        token = new Token('LBRACE', this.CurrentChar)
        break
      case '}':
        token = new Token('RBRACE', this.CurrentChar)
        break
      case 'tokenEnd':
        token = new Token('EOF', '')
        break
    }
    this.ReadChar()
    return token
  }
  // exist() {
  //   if (this.idx < 0) {
  //     return false
  //   }
  //   if (this.str.length <= this.idx) {
  //     return false
  //   }
  //   return true
  // }
  ReadChar () {
    if (this.position >= this.Input.length) {
      this.CurrentChar　= 'tokenEnd'
    } else {
      this.CurrentChar = this.Input[this.position]
    }
    if (this.position + 1 >= this.Input.Length) {
      this.NextChar = 'tokenEnd'
    } else {
      this.NextChar = this.Input[this.position]
    }
    this.position += 1;
  }
}
