// TOKEN定義
class.WerewolfConfigToken{
  constructor(type, literal){
    if (!(typeof type === String && tokenType.hasOwnProperty(type))) {
      console.log('this type do not difined', type)
      break
    }
    this.Type = type
    this.Literal = literal
  }

}

const tokenType = {
  //不正なトークン, 終端
  LLLEGAL: true,
  EOF: true,
  // 識別子
  IDENT: true,
  INTENGER: true,
  //演算子
  PLUS: true,
  COMMA: true,
  SEMICOLON: true,
  ASSIGN: true,
  //　かっこ
  LPAREN: true,
  RPAREN: true,
  LBRACE: true,
  RBRACE: true,
  // キーワード
  FUNCTION: true,
  STRING: true,
  INT: true,
  BOOLEAN: true
}
module.exports = {
  'werewolfConfigToken': WerewolfConfigToken,
  'TokenType': tokenType
}
