import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RotateCcw, AlertCircle, Crown } from 'lucide-react';
import type { GameState } from '@/types/game';

interface GameControlsProps {
  gameState: GameState;
  onGameStateUpdate: (newState: GameState) => void;
}

export default function GameControls({ gameState, onGameStateUpdate }: GameControlsProps) {
  const resetGame = () => {
    onGameStateUpdate({
      currentPlayer: 'white',
      status: 'active',
      moveHistory: []
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Crown 
            className={`w-5 h-5 ${
              gameState.currentPlayer === 'white' ? 'text-amber-600' : 'text-gray-900'
            }`}
          />
          <span className="font-medium">
            Current Turn: {gameState.currentPlayer.charAt(0).toUpperCase() + gameState.currentPlayer.slice(1)}
          </span>
        </div>
        <Button 
          variant="outline" 
          onClick={resetGame}
          className="flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Game
        </Button>
      </div>

      {gameState.status === 'checkmate' && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Checkmate! {gameState.currentPlayer === 'white' ? 'Black' : 'White'} wins!
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
