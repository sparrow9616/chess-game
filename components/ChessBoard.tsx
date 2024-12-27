import { useState } from 'react';
import { INITIAL_BOARD } from '@/lib/constants';
import { isValidMove, getPieceColor, getPieceSymbol, getValidMoves } from '@/lib/gameLogic';
import type { GameState, BoardPosition, ChessBoard } from '@/types/game';

interface ChessBoardProps {
  gameState: GameState;
  onGameStateUpdate: (newState: GameState) => void;
}

export default function ChessBoard({ gameState, onGameStateUpdate }: ChessBoardProps) {
  const [board, setBoard] = useState<ChessBoard>(INITIAL_BOARD);
  const [selectedPiece, setSelectedPiece] = useState<BoardPosition | null>(null);
  const [validMoves, setValidMoves] = useState<BoardPosition[]>([]);

  const handleSquareClick = (row: number, col: number) => {
    if (gameState.status !== 'active') return;

    if (!selectedPiece) {
      if (board[row][col] && getPieceColor(board[row][col]) === gameState.currentPlayer) {
        setSelectedPiece([row, col]);
        // Calculate and set valid moves when a piece is selected
        const moves = getValidMoves(board, [row, col], gameState.currentPlayer);
        setValidMoves(moves);
      }
    } else {
      const [selectedRow, selectedCol] = selectedPiece;
      const isValidTarget = validMoves.some(([r, c]) => r === row && c === col);
      
      if (isValidTarget) {
        const newBoard = board.map(row => [...row]);
        const movingPiece = newBoard[selectedRow][selectedCol];
        newBoard[row][col] = movingPiece;
        newBoard[selectedRow][selectedCol] = '';
        
        setBoard(newBoard);
        
        const newMove = {
          piece: movingPiece,
          from: `${String.fromCharCode(97 + selectedCol)}${8 - selectedRow}`,
          to: `${String.fromCharCode(97 + col)}${8 - row}`
        };

        onGameStateUpdate({
          ...gameState,
          currentPlayer: gameState.currentPlayer === 'white' ? 'black' : 'white',
          moveHistory: [...gameState.moveHistory, newMove],
          status: board[row][col].toLowerCase() === 'k' ? 'checkmate' : 'active'
        });
      }
      
      setSelectedPiece(null);
      setValidMoves([]);
    }
  };

  const isValidTarget = (row: number, col: number): boolean => {
    return validMoves.some(([r, c]) => r === row && c === col);
  };

  return (
    <div className="grid grid-cols-8 gap-0 border border-gray-200">
      {board.map((row, rowIndex) => (
        row.map((piece, colIndex) => {
          const isSelected = selectedPiece?.[0] === rowIndex && selectedPiece?.[1] === colIndex;
          const isLight = (rowIndex + colIndex) % 2 === 0;
          const isValidMoveTarget = isValidTarget(rowIndex, colIndex);
          
          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`
                aspect-square flex items-center justify-center text-2xl
                cursor-pointer transition-colors relative
                ${isLight ? 'bg-amber-50' : 'bg-amber-900'}
                ${isSelected ? 'ring-2 ring-blue-500' : ''}
                ${isValidMoveTarget ? 'ring-2 ring-green-500' : ''}
                hover:bg-blue-100
              `}
              onClick={() => handleSquareClick(rowIndex, colIndex)}
            >
              <span className={getPieceColor(piece) === 'white' ? 'text-gray-700' : 'text-gray-900'}>
                {getPieceSymbol(piece)}
              </span>
              {isValidMoveTarget && (
                <div className={`absolute inset-0 bg-green-500 opacity-20 
                  ${piece ? 'ring-2 ring-green-500' : 'rounded-full w-4 h-4 m-auto'}`}
                />
              )}
            </div>
          );
        })
      ))}
    </div>
  );
}