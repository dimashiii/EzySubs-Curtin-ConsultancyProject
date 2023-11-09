import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from './app/store';
import { updatePlayer } from './app/features/playerData/playersSlice';

const PlayerInputForm = ({ onNext }) => {
  const dispatch = useAppDispatch();
  const players = useAppSelector((state) => state.players.players);

  const findPlayer = useMemo(() => {
    return (id) => {
      return players.find((player) => player.id === id);
    };
  }, [players]);


  const handleNext = () => {
    onNext(players);
  };

  const handleInputChange = (e, playerId, field) => {
    const player = findPlayer(playerId)
    const newPlayer = {...player}
    newPlayer[field] = e.target.value;
    dispatch(updatePlayer(newPlayer))
  };

  return (
    <div className="page-container"> {/* Use the page-container class for consistent styling */}
      <div className="content-container"> {/* Use the content-container class for consistent styling */}
        <h3></h3>
        <form>
          {players.map( (player, index) => (
            <div key={player.id} className="input-container"> {/* Use the input-container class for consistent styling */}
              <input
                type="text"
                placeholder={`Player ${index + 1} Name`}
                value={player.name}
                onChange={(e) => handleInputChange(e, player.id, 'name')}
                required
              />
              <select
                value={player.size}
                onChange={(e) => handleInputChange(e, player.id, 'size')}
                required
              >
                <option value="">Select Size</option>
                <option value="Big">Big</option>
                <option value="Small">Small</option>
              </select>
            </div>
          ))}
          <button type="button" onClick={handleNext}>
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlayerInputForm;





