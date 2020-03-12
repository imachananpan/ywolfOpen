// console.log(outputTokens(" for{  String k = 'doraemon}"))
function Disassembly(input) {
  // IdentifyAST
}
function IdentifyAST(input) {
        //変数宣言のAST
        const hensu = {
            'STR': true,
            'INT': true,
            'BOOLEAN': true,
        }
        let IdentifyTree = {};
        const Type = input.literal[0];
        const Identfy = input.literal[1];
        const ASSIGN =input.literal[2];
        // let continued = false;
        let Info = {continued: false}
        //errcheck
        let err = []
        let errChecker = false
        if (!hensu.hasOwnProperty(input.Tokens[0])){
            errChecker = true
            err.push('keywordがおかしい', input.literal[0])
        }
        if('Declare'+Type !==input.Tokens[1]) {
            errChecker = true
            err.push('変数名がおかしい', input.literal[1])
        }
        if (input.Tokens[2] !== 'ASSIGN') {
          errChecker = true
          err.push('noneASSIGN', input.literal[2])
        }
        if (errChecker) {
            return err
        }
        // if (input.literal.length === 4) {
        //     let express = input.literal[3];
        //     IdentifyTree[Type] = Identfy;
        //     IdentifyTree['express'] = express;
        //     return { 'Tree':IdentifyTree, 'Info': Info }
        // } else {
            Info.continued = true;
            let express = {};
            express['Tokens'] = input.Tokens.splice(3,input.Tokens.length);
            express['literal'] = input.literal.splice(3,input.literal.length);
            IdentifyTree[Type] = Identfy;
            IdentifyTree['express'] = express;
            return { 'Tree':IdentifyTree, 'Info': Info }
       // }
    }
function returnAST(input) {
    let express = {}
    express['Tokens'] = input.Tokens
    express['literal'] = input.literal
    return express
}
// function toCode(Tree) {

// }
function expressParentAST(input) {
  // ex:(a + b)/5 * (3 + 5)
  //優先順位表
  // let Priority = {
  //   '=': 'ASSIGN',
  //   ';': 'SEMICOLON',
  //   '(': 'LPAREN',
  //   ')': 'RPAREN',
  //   '{': 'LBRACE',
  //   '}': 'RBRACE',
  //   'tokenEnd': 'EOF',
  //   '.': 'CONMA',
  //   '/': 'SLASH',
  //   '*': 'ASTERISK',
  //   '+': 'PLUS',
  //   '-': 'MINUS',
  // }
  let priority = {
    '_EQ': 4, //最後がEQになる
    'GT' : 4, // <
    'LT' : 4, // >
    'NOT': 7, //否定
    'MINUSED': 7, //先頭が-接頭辞　演算子とはちがう
    'LPAREN': 5, //かっこ
    'LBRACE': 5, //かっこ
    'SLASH': 3,
    'ASTERISK': 3,
    'PLUS': 3,
    'MINUS': 3
  }
  let prioritys = []
  let minPriority = 8
  for (let token of input.Tokens) {
    if (priority.hasOwnProperty(token)) {
      prioritys.push(priority[token])
      if (priority[token] < minPriority) {
        maxPriority = priority[token]
      }
    } else if (token.slice(token.length-3) === '_EQ') {
      //末尾に_EQとつく
      prioritys.push(4)
      if (4 < minPriority) {
        maxPriority = 4
      }
    } else {
      console.log('literal', token)
      prioritys.push(8)
    }
  }
  //完成したpriorityを元に再帰funcを投げて完成した木を手に入れる
  let expressedTree = expressAST(input.literal, input.Tokens, prioritys, targetPriority)
  console.log('expressedTree', expressedTree)
}
function compareFunc(a,b) {
  //降順にするための道具func
  return a - b
}
function expressAST (literals, Tokens, prioritys, targetPriority) {
  //　優先度s,literals,Tokensが来るはず
  //　それを再帰的に処理したい
  let tree = { name:''}
  if (targetPriority === 5) {
    //()の場合
    const targetRparen = Tokens.lastIndexOf('RPAREN') //RPARENがある 右
    const targetLparen = Tokens.lastIndexOf('LPAREN') //LPARENがある 左
    const targetLength = targetRparen - targetLparen
    //()ごと取り出す
    let target = {}
     target['literals'] = literals.splice(targetLparen, targetLength)
     target['Tokens'] = Tokens.splice(targetLparen, targetLength)
     target['prioritys'] = prioritys.splice(targetLparen, targetLength)
    for (let key of Object.keys(target)) {
      //()をけずる
      target[key].splice(1, target[key].length - 1)
    }
    const targetLparen = Tokens.lastIndexOf('LPAREN') //RPARENがある 左
    //literals等に残った()の方を削る
    literals.splice(targetLparen, 2)
    Tokens.splice(targetLparen, 2)
    prioritys.splice(targetLparen, 2)
    let sortPriority = targetPriority
    if (!target['Tokens'].hasOwnProperty('LPAREN') && !target['Tokens'].hasOwnProperty('RPAREN')) {
      //targetに()がなければ
      sortPriority = target['prioritys'].sort(compareFunc)[0]
      //ここのsortは毎回sortしちゃってるので、気になるあとで改善したい
    }
    tree['name'] = 'RPAREN'
    tree['middle'] = expressAST(target['literals'], target['Tokens'], target['prioritys'], sortPriority)
  } else if (targetPriority !== 8) {
    //演算か比較？
    const targetIndex = prioritys.lastIndexOf(targetPriority)
    const targetTokens = target['Tokens'][targetIndex]
    let targetRight  = {}
    let targetLeft = {}
     targetLeft['literals'] = literals.splice(0, targetIndex - 1)
     targetLeft['Tokens'] = Tokens.splice(0, targetIndex - 1)
     targetLeft['prioritys'] = prioritys.splice(0, targetIndex - 1)
     targetRight['literals'] = literals.splice(targetIndex + 1)
     targetRight['Tokens'] = Tokens.splice(targetIndex + 1)
     targetRight['prioritys'] = prioritys.splice(targetIndex + 1)
    literals.splice(targetIndex, 1)
    Tokens.splice(targetIndex, 1)
    prioritys.splice(targetIndex, 1)
    //次の分割後のtargetPriority
    let rightpriority = targetPriority
    let leftpriority = targetPriority
    if (!targetRight['prioritys'].hasOwnProperty(targetPriority) && !targetRight['prioritys'].hasOwnProperty(targetPriority)) {
      //targetに()がなければ
      rightpriority = targetRight['prioritys'].sort(compareFunc)[0]
      //ここのsortは毎回sortしちゃってるので、気になるあとで改善したい
    }
    if (!targetLeft['prioritys'].hasOwnProperty(targetPriority) && !targetLeft['prioritys'].hasOwnProperty(targetPriority)) {
      //targetに()がなければ
      leftpriority = targetLeft['prioritys'].sort(compareFunc)[0]
      //ここのsortは毎回sortしちゃってるので、気になるあとで改善したい
    }
    tree['name'] = targetTokens
    tree['left'] = expressAST(targetLeft['literals'], targetLeft['Tokens'], targetLeft['prioritys'], leftpriority)
    tree['right'] = expressAST(targetRight['literals'], targetRight['Tokens'], targetRight['prioritys'], rightpriority)
  } else {
    // literal値？
    console.log('literal', tree)
  }
  //くっつける作業
  let comTree = {name:tree['name']}
  for (let treeKey of Object.keys(tree)) {
     if (treeKey = 'name') {
       continue
     }
     comTree[tree['treeKey']['name']] = tree['treeKey']
  }
  console.log('tree', comTree)
  return comTree
}
function rightAndLeftAST(right,left) {
  //もらったら、それを左と右に分ける
  //== < > _EQ等に対応
  let tree = {}
  tree['right'] = right
  tree['left'] = left
  return tree
}
function middleAST (middle) {
  //かっこ等のfunc
  let tree = {}
  let tree = middle
  return middle
}
function createAST(input) {
        const tokens = outputTokens(input)
        console.log('tokens:', tokens)
        const A =IdentifyAST(tokens)
        console.log('test:', A)
        console.log('nakami', A.Tree)
        let AST = {}
    }

// let were = new werewolfAST()
function simpleexpressAST (input,Identfys) {
    // ex:(a + b)/5 * (3 + 5)
    // ex:(a + b)/5 * (3 + 5) delete_system() + 'delete_system()'
    /*
    その文字が宣言されているものかどうかを調べるそれ以外は文字列かどうかを調べる
    simpleexpressASTを使われる場合は,'文字列'でもらった文字列を関数実行などにされないことを気をつける
    */
    //DeclaredontSetTokenは宣言されているか調べる
    //ここではlint的なcheckで危険性がないかどうかを品定めする
    //のちにjavascriptに文字列として返すので少しこわい...
    //ので機能を拡張し、自由度を広げるならexpress構文木は作るべき（都度安全性を考慮すべし）
    //計算値はSTRかint(数)かBooleanなのでそこもおかしくないか判定する('STR' + 3)等
    let lparenCounter = 0 // (の数判定機　検査終了後0でなければerr マイナスになればただちにerr
    let quotasionCounter = 0 //'の数判定機　検査終了後偶数でなければerr奇数の時それより先を文字列としてcount
    let leftJudge = '' //  現時点では文字列/Intenget等を判定する 文字列は足し算のみ　数は四則演算　比較が入ったら直ちにboolean
    //　演算子の分子,左側を見る
    let stringmode = false
    let judgeType = '' // この式がどういうTypeなのか Intenger -> String -> Boolean 　左から右はありえるが、右から左へはありえない
    let backType = ''
    let enzanflag = false
    let err = {} //return用
    let errFlag = false
    let paren = {
      'LPAREN': '(',
      'RPAREN': ')',
    }
    let enzanType = {
      'PLUS': '+',
      'MINUS': '-',
      'SLASH': '/',
      'ASTERISK': '*'
    }
    let enzanLiteral = {
      '+': 'PLUS',
      '-': 'MINUS',
      '/': 'SLASH',
      '*': 'ASTERISK'
    }
    let hikaku = {
      
    }
    for (let token of input['Tokens']) {
      if (token = 'LPAREN') {
        //PAREN判定
        lparenCounter += 1
        continue
      }
      if (token = 'RPAREN') {
        //PAREN判定
        lparenCounter -= 1
        continue
      }
      if (token = 'quotasion') {
        quotasionCounter += 1
        if (stringmode && quotasionCounter%2==0) {
          //　奇数から偶数
          backType = 'string'
        }
        if (judgeType !== 'Boolean') {
          judgeType = 'String'
        }
        stringmode = !stringmode
        continue
      }
      if (enzanType.hasOwnProperty(token)) {
        //enzan判定
        enzanJudge = 'enzan'
        leftType = backType
        enzanflag = true
      }
      if ()
    }

}
