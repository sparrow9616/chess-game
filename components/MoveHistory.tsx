import { getPieceSymbol } from '@/lib/gameLogic';
import type { Move } from '@/types/game';

interface MoveHistoryProps {
  moves: Move[];
}

export default function MoveHistory({ moves }: MoveHistoryProps) {
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <h3 className="font-medium mb-2">Move History</h3>
      <div className="space-y-1">
        {moves.map((move, index) => (
          <div key={index} className="text-sm text-gray-600">
            {index + 1}. {getPieceSymbol(move.piece)} {move.from} → {move.to}
          </div>
        ))}
      </div>
    </div>
  );
}
