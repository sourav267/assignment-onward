export default function validateString(formString) {
  let stack = [];
  let openBracketCount = 0;
  let closedBracketCount = 0;
  for (const char of formString) {
    if (char === "(" || char === ")") {
      stack.push(char);
    }
  }
  stack.forEach((brac) => {
    if (brac === "(") {
      openBracketCount += 1;
    } else {
      closedBracketCount += 1;
    }
  });
  return validateBracketCount(openBracketCount, closedBracketCount);
}

export function validateBracketCount(openBracketCount, closedBracketCount) {
  if (openBracketCount === closedBracketCount) {
    return true;
  }
  return false;
}


function convertStringToQuery(queryString) {
  if (validateString(queryString)) {
    convertToQuery(queryString)
  } else {
    console.log("Syntax invalid");
  }
}

function convertToQuery(queryString) {
  let globalOpeartor = "";
  let termOperatorOne = "";
  let termOperatorTwo = "";
  let localOperandOne = [];
  let localOperandTwo = [];
  let mongoQuery = ``;
  // split the query based on global opartor at top
  splitQuery = queryString.split(/\) (\|\||\&\&) \(/);
  localOperandOne = splitQuery[0].split(/\&\&|\|\|/);
  localOperandTwo = splitQuery[2].split(/\&\&|\|\|/);

  /*
  use the below query to extract operands and put  in mongo query
  */
  // console.log(localOperandOne[0].substr(1, 3));
  // console.log(localOperandOne[1].substr(1, 3));
  // console.log(localOperandTwo[0].substr(0, 3));
  // console.log(localOperandTwo[1].substr(1, 3));
  // condition for for finding global operator

  if (splitQuery[1].search(/\|\|/) >= 0) {
    globalOpeartor = "or";
  } else {
    globalOpeartor = "and";
  }

  // condition for finding term operator one
  if (splitQuery[0].search(/\&\&/) >= 0) {
    termOperatorOne = "and";
  } else {
    termOperatorOne = "or";
  }
  // condition for finding term operator two
  if (splitQuery[2].search(/\&\&/) >= 0) {
    termOperatorTwo = "and";
  } else {
    termOperatorTwo = "or";
  }

  // build mongo query
  convertedQuery = `{
    "query":{
      "${globalOpeartor}":[
        "${termOperatorOne}":{
          "${localOperandOne[0].substr(1, 3).split('=')[0]}":${localOperandOne[0].substr(1, 3).split('=')[1]},
          "${localOperandOne[1].substr(1, 3).split('=')[0]}":${localOperandOne[1].substr(1, 3).split('=')[1]}
        },
        "${termOperatorTwo}":{
          "${localOperandTwo[0].substr(0, 3).split('=')[0]}":${localOperandTwo[0].substr(0, 3).split('=')[1]},
          "${localOperandTwo[1].substr(1, 3).split('=')[0]}":${localOperandTwo[1].substr(1, 3).split('=')[1]},
        }
      ]
    }
  }`;
  console.log(convertedQuery);
}

convertStringToQuery("(A=2 && B=3) || (C=3 || D=4)");