import type { PieceType, PlayerColor, BoardPosition, ChessBoard } from '@/types/game';

export const getPieceColor = (piece: PieceType): PlayerColor | null => {
  if (!piece) return null;
  return piece === piece.toUpperCase() ? 'white' : 'black';
};

export const getPieceSymbol = (piece: PieceType): string => {
  const symbols: Record<PieceType, string> = {
    'k': '♔', 'q': '♕', 'r': '♖', 'b': '♗', 'n': '♘', 'p': '♙',
    'K': '♚', 'Q': '♛', 'R': '♜', 'B': '♝', 'N': '♞', 'P': '♟',
    '': ''
  };
  return symbols[piece];
};

export const isValidMove = (
  board: ChessBoard, 
  startPos: BoardPosition, 
  endPos: BoardPosition, 
  currentPlayer: PlayerColor
): boolean => {
  const [startRow, startCol] = startPos;
  const [endRow, endCol] = endPos;
  const piece = board[startRow][startCol];
  const pieceColor = getPieceColor(piece);
  
  if (pieceColor !== currentPlayer) return false;
  if (getPieceColor(board[endRow][endCol]) === currentPlayer) return false;
  
  const rowDiff = Math.abs(endRow - startRow);
  const colDiff = Math.abs(endCol - startCol);
  
  switch (piece.toLowerCase()) {
    case 'p': {
      const direction = pieceColor === 'white' ? -1 : 1;
      const initialRow = pieceColor === 'white' ? 6 : 1;
      
      if (startCol === endCol && !board[endRow][endCol]) {
        if (startRow === initialRow) {
          return rowDiff <= 2 && (endRow - startRow) / rowDiff === direction;
        }
        return rowDiff === 1 && (endRow - startRow) / rowDiff === direction;
      }
      return false;
    }
    
    case 'r':
      return (startRow === endRow || startCol === endCol);
    
    case 'n':
      return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
    
    case 'b':
      return rowDiff === colDiff;
    
    case 'q':
      return rowDiff === colDiff || startRow === endRow || startCol === endCol;
    
    case 'k':
      return rowDiff <= 1 && colDiff <= 1;
    
    default:
      return false;
  }
};

export const getValidMoves = (
    board: ChessBoard,
    position: BoardPosition,
    currentPlayer: PlayerColor
  ): BoardPosition[] => {
    const [row, col] = position;
    const piece = board[row][col];
    const validMoves: BoardPosition[] = [];
    
    // Check all possible positions on the board
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (isValidMove(board, position, [r, c], currentPlayer)) {
          validMoves.push([r, c]);
        }
      }
    }
  
    return validMoves;
  };