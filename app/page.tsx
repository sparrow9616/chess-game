'use client';
import { useState } from 'react';
import ChessBoard from '@/components/ChessBoard';
import GameControls from '@/components/GameControls';
import MoveHistory from '@/components/MoveHistory';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { GameState } from '@/types/game';

export default function Home() {
  const [gameState, setGameState] = useState<GameState>({
    currentPlayer: 'white',
    status: 'active',
    moveHistory: [],
  });

  const handleGameStateUpdate = (newState: GameState) => {
    setGameState(newState);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Multiplayer Chess</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <ChessBoard 
                gameState={gameState}
                onGameStateUpdate={handleGameStateUpdate}
              />
            </div>
            <div className="space-y-6">
              <GameControls 
                gameState={gameState}
                onGameStateUpdate={handleGameStateUpdate}
              />
              <MoveHistory moves={gameState.moveHistory} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}