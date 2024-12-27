export type PieceType = 'k' | 'q' | 'r' | 'b' | 'n' | 'p' | 'K' | 'Q' | 'R' | 'B' | 'N' | 'P' | '';
export type PlayerColor = 'white' | 'black';
export type GameStatus = 'active' | 'checkmate';
export type BoardPosition = [number, number];
export type ChessBoard = PieceType[][];

export interface GameState {
  currentPlayer: PlayerColor;
  status: GameStatus;
  moveHistory: Move[];
}

export interface Move {
  piece: PieceType;
  from: string;
  to: string;
}