/*
 * This file was AUTOMATICALLY generated from an ALPACA description.
 * EDIT AT YOUR OWN RISK!
 */


function in_nbhd_pred(pf, x, y, pred, nbhd) {
  var count = 0;
  for (var i = 0; i < nbhd.length; i++) {
    if (pred(pf.get(x+nbhd[i][0], y+nbhd[i][1]))) {
      count++;
    }
  }
  return count;
}

function in_nbhd_eq(pf, x, y, stateId, nbhd) {
  return in_nbhd_pred(pf, x, y, function(x) { return x === stateId; }, nbhd);
}

function evolve_playfield(pf, new_pf) {
  pf.map(new_pf, evalState, -1, -1, 1, 1);
}
function loadMapper(c) {
  if (c === '!') return 'SkipStart';
  if (c === ' ') return 'Space';
  if (c === '%') return 'SkipStop';
  if (c === '*') return 'FlipCmd';
  if (c === '-') return 'Bus';
  if (c === '1') return 'OnBit';
  if (c === '0') return 'OffBit';
  if (c === '<') return 'LeftCmd';
  if (c === '>') return 'RightCmd';
  if (c === 'C') return 'ContReply';
  if (c === 'F') return 'FlipSig';
  if (c === 'I') return 'InstrMark';
  if (c === 'L') return 'LeftSig';
  if (c === 'Q') return 'QuerySig';
  if (c === 'S') return 'SkipReply';
  if (c === 'R') return 'RightSig';
  if (c === 'W') return 'WakeMark';
  if (c === '[') return 'WhileCmd';
  if (c === ']') return 'WendCmd';
  if (c === 'c') return 'ContTool';
  if (c === 'd') return 'DataPtr';
  if (c === 'f') return 'FlipTool';
  if (c === 'i') return 'InstrPtr';
  if (c === 'l') return 'LeftTool';
  if (c === 's') return 'SkipTool';
  if (c === 'r') return 'RightTool';
  if (c === '{') return 'SkipBack';
  if (c === '}') return 'SkipFore';
};
function dumpMapper(s) {
  if (s === 'SkipStart') return '!';
  if (s === 'Space') return ' ';
  if (s === 'SkipStop') return '%';
  if (s === 'FlipCmd') return '*';
  if (s === 'Bus') return '-';
  if (s === 'OnBit') return '1';
  if (s === 'OffBit') return '0';
  if (s === 'LeftCmd') return '<';
  if (s === 'RightCmd') return '>';
  if (s === 'ContReply') return 'C';
  if (s === 'FlipSig') return 'F';
  if (s === 'InstrMark') return 'I';
  if (s === 'LeftSig') return 'L';
  if (s === 'QuerySig') return 'Q';
  if (s === 'SkipReply') return 'S';
  if (s === 'RightSig') return 'R';
  if (s === 'WakeMark') return 'W';
  if (s === 'WhileCmd') return '[';
  if (s === 'WendCmd') return ']';
  if (s === 'ContTool') return 'c';
  if (s === 'DataPtr') return 'd';
  if (s === 'FlipTool') return 'f';
  if (s === 'InstrPtr') return 'i';
  if (s === 'LeftTool') return 'l';
  if (s === 'SkipTool') return 's';
  if (s === 'RightTool') return 'r';
  if (s === 'SkipBack') return '{';
  if (s === 'SkipFore') return '}';
};
function is_Reply(st) {
  return (st === 'SkipReply') || (st === 'ContReply') || 0;
}

function is_Signal(st) {
  return (st === 'RightSig') || (st === 'FlipSig') || (st === 'LeftSig') || (st === 'QuerySig') || 0;
}

function evalClass_Signal(pf, x, y) {
var id;
if (true) {
  return 'Bus';
}
return undefined;
}

function evalClass_Reply(pf, x, y) {
var id;
if (true) {
  return 'Bus';
}
return undefined;
}

function eval_Space(pf, x, y) {
var id;
if ((((pf.get(x+0,y+-1)==='WakeMark')&&(pf.get(x+1,y+-1)==='WendCmd'))||(pf.get(x+1,y+0)==='SkipBack'))) {
  return 'SkipBack';
}
if (((pf.get(x+-1,y+-1)==='SkipReply')&&(pf.get(x+0,y+-1)==='InstrMark'))) {
  return 'SkipStart';
}
if (((pf.get(x+-1,y+1)==='SkipStart')||(pf.get(x+-1,y+0)==='SkipFore'))) {
  return 'SkipFore';
}
return 'Space';
}

function eval_Bus(pf, x, y) {
var id;
if (is_Signal(pf.get(x+1,y+0))) {
  return pf.get(x+1,y+0);
}
if (is_Signal(pf.get(x+1,y+-1))) {
  return pf.get(x+1,y+-1);
}
if (is_Signal(pf.get(x+1,y+1))) {
  return pf.get(x+1,y+1);
}
if (is_Reply(pf.get(x+-1,y+0))) {
  return pf.get(x+-1,y+0);
}
if (is_Reply(pf.get(x+-1,y+-1))) {
  return pf.get(x+-1,y+-1);
}
if (is_Reply(pf.get(x+-1,y+1))) {
  return pf.get(x+-1,y+1);
}
if (((pf.get(x+1,y+0)==='LeftTool')||(pf.get(x+-1,y+0)==='RightTool'))) {
  return 'ContTool';
}
if ((pf.get(x+-1,y+0)==='ContTool')) {
  return 'ContReply';
}
if ((pf.get(x+-1,y+0)==='SkipTool')) {
  return 'SkipReply';
}
if (((pf.get(x+1,y+0)==='InstrPtr')&&(pf.get(x+1,y+-1)==='LeftCmd'))) {
  return 'LeftSig';
}
if (((pf.get(x+1,y+0)==='InstrPtr')&&(pf.get(x+1,y+-1)==='RightCmd'))) {
  return 'RightSig';
}
if (((pf.get(x+1,y+0)==='InstrPtr')&&(pf.get(x+1,y+-1)==='FlipCmd'))) {
  return 'FlipSig';
}
if (((pf.get(x+1,y+0)==='InstrPtr')&&(pf.get(x+1,y+-1)==='WhileCmd'))) {
  return 'QuerySig';
}
if ((((pf.get(x+-1,y+0)==='WakeMark')||(pf.get(x+-1,y+1)==='WakeMark'))||(pf.get(x+-1,y+-1)==='Wakemark'))) {
  return 'InstrPtr';
}
if (((pf.get(x+-1,y+0)==='InstrPtr')&&(pf.get(x+-1,y+-1)==='Space'))) {
  return 'InstrPtr';
}
if ((pf.get(x+1,y+0)==='SkipBack')) {
  return 'InstrPtr';
}
if ((pf.get(x+-1,y+0)==='SkipFore')) {
  return 'SkipStop';
}
if ((pf.get(x+-1,y+0)==='SkipStop')) {
  return 'InstrPtr';
}
return 'Bus';
}

function eval_LeftSig(pf, x, y) {
var id;
id = evalClass_Signal(pf, x, y);
if (id !== undefined) return id;
return 'LeftSig';
}

function eval_RightSig(pf, x, y) {
var id;
id = evalClass_Signal(pf, x, y);
if (id !== undefined) return id;
return 'RightSig';
}

function eval_FlipSig(pf, x, y) {
var id;
id = evalClass_Signal(pf, x, y);
if (id !== undefined) return id;
return 'FlipSig';
}

function eval_QuerySig(pf, x, y) {
var id;
id = evalClass_Signal(pf, x, y);
if (id !== undefined) return id;
return 'QuerySig';
}

function eval_ContReply(pf, x, y) {
var id;
id = evalClass_Reply(pf, x, y);
if (id !== undefined) return id;
return 'ContReply';
}

function eval_SkipReply(pf, x, y) {
var id;
id = evalClass_Reply(pf, x, y);
if (id !== undefined) return id;
return 'SkipReply';
}

function eval_DataPtr(pf, x, y) {
var id;
if ((pf.get(x+1,y+0)==='FlipSig')) {
  return 'FlipTool';
}
if ((pf.get(x+1,y+0)==='LeftSig')) {
  return 'LeftTool';
}
if ((pf.get(x+1,y+0)==='RightSig')) {
  return 'RightTool';
}
if (((pf.get(x+1,y+0)==='QuerySig')&&(pf.get(x+0,y+-1)==='OffBit'))) {
  return 'SkipTool';
}
if (((pf.get(x+1,y+0)==='QuerySig')&&(pf.get(x+0,y+-1)==='OnBit'))) {
  return 'ContTool';
}
return 'DataPtr';
}

function eval_FlipTool(pf, x, y) {
var id;
if (true) {
  return 'ContTool';
}
return 'FlipTool';
}

function eval_LeftTool(pf, x, y) {
var id;
if (true) {
  return 'Bus';
}
return 'LeftTool';
}

function eval_RightTool(pf, x, y) {
var id;
if (true) {
  return 'Bus';
}
return 'RightTool';
}

function eval_ContTool(pf, x, y) {
var id;
if (true) {
  return 'DataPtr';
}
return 'ContTool';
}

function eval_SkipTool(pf, x, y) {
var id;
if (true) {
  return 'DataPtr';
}
return 'SkipTool';
}

function eval_OnBit(pf, x, y) {
var id;
if ((pf.get(x+0,y+1)==='FlipTool')) {
  return 'OffBit';
}
return 'OnBit';
}

function eval_OffBit(pf, x, y) {
var id;
if ((pf.get(x+0,y+1)==='FlipTool')) {
  return 'OnBit';
}
return 'OffBit';
}

function eval_InstrPtr(pf, x, y) {
var id;
if ((pf.get(x+0,y+-1)==='Space')) {
  return 'Bus';
}
if (true) {
  return 'InstrMark';
}
return 'InstrPtr';
}

function eval_InstrMark(pf, x, y) {
var id;
if ((pf.get(x+-1,y+0)==='ContReply')) {
  return 'WakeMark';
}
if ((pf.get(x+-1,y+0)==='SkipReply')) {
  return 'Bus';
}
return 'InstrMark';
}

function eval_WakeMark(pf, x, y) {
var id;
if (true) {
  return 'Bus';
}
return 'WakeMark';
}

function eval_SkipStart(pf, x, y) {
var id;
if (true) {
  return 'Space';
}
return 'SkipStart';
}

function eval_SkipStop(pf, x, y) {
var id;
if (true) {
  return 'Bus';
}
return 'SkipStop';
}

function eval_SkipFore(pf, x, y) {
var id;
if (true) {
  return 'Space';
}
return 'SkipFore';
}

function eval_SkipBack(pf, x, y) {
var id;
if (true) {
  return 'Space';
}
return 'SkipBack';
}

function eval_FlipCmd(pf, x, y) {
var id;
return 'FlipCmd';
}

function eval_LeftCmd(pf, x, y) {
var id;
return 'LeftCmd';
}

function eval_RightCmd(pf, x, y) {
var id;
return 'RightCmd';
}

function eval_WhileCmd(pf, x, y) {
var id;
return 'WhileCmd';
}

function eval_WendCmd(pf, x, y) {
var id;
return 'WendCmd';
}

function evalState(pf, x, y) {
  var stateId = pf.get(x, y);
  if (stateId === 'Space') return eval_Space(pf, x, y);
  if (stateId === 'Bus') return eval_Bus(pf, x, y);
  if (stateId === 'LeftSig') return eval_LeftSig(pf, x, y);
  if (stateId === 'RightSig') return eval_RightSig(pf, x, y);
  if (stateId === 'FlipSig') return eval_FlipSig(pf, x, y);
  if (stateId === 'QuerySig') return eval_QuerySig(pf, x, y);
  if (stateId === 'ContReply') return eval_ContReply(pf, x, y);
  if (stateId === 'SkipReply') return eval_SkipReply(pf, x, y);
  if (stateId === 'DataPtr') return eval_DataPtr(pf, x, y);
  if (stateId === 'FlipTool') return eval_FlipTool(pf, x, y);
  if (stateId === 'LeftTool') return eval_LeftTool(pf, x, y);
  if (stateId === 'RightTool') return eval_RightTool(pf, x, y);
  if (stateId === 'ContTool') return eval_ContTool(pf, x, y);
  if (stateId === 'SkipTool') return eval_SkipTool(pf, x, y);
  if (stateId === 'OnBit') return eval_OnBit(pf, x, y);
  if (stateId === 'OffBit') return eval_OffBit(pf, x, y);
  if (stateId === 'InstrPtr') return eval_InstrPtr(pf, x, y);
  if (stateId === 'InstrMark') return eval_InstrMark(pf, x, y);
  if (stateId === 'WakeMark') return eval_WakeMark(pf, x, y);
  if (stateId === 'SkipStart') return eval_SkipStart(pf, x, y);
  if (stateId === 'SkipStop') return eval_SkipStop(pf, x, y);
  if (stateId === 'SkipFore') return eval_SkipFore(pf, x, y);
  if (stateId === 'SkipBack') return eval_SkipBack(pf, x, y);
  if (stateId === 'FlipCmd') return eval_FlipCmd(pf, x, y);
  if (stateId === 'LeftCmd') return eval_LeftCmd(pf, x, y);
  if (stateId === 'RightCmd') return eval_RightCmd(pf, x, y);
  if (stateId === 'WhileCmd') return eval_WhileCmd(pf, x, y);
  if (stateId === 'WendCmd') return eval_WendCmd(pf, x, y);
}
