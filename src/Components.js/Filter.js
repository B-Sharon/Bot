import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function BotSpecs() {
  const { botId } = useParams();
  const [botDetails, setBotDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch bot details based on botId
    fetch(`http://localhost:3000/bots/${botId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setBotDetails(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching bot details:', error));
  }, [botId]);

  const handleEnlist = () => {
    // Logic for enlisting the bot
    console.log('Enlisting bot:', botDetails.name);
  };

  const handleDischarge = () => {
    // Logic for discharging the bot
    console.log('Discharging bot:', botDetails.name);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Bot Specs</h1>
      {botDetails ? (
        <div>
          <h2>{botDetails.name}</h2>
          {botDetails.avatar_url && <img src={botDetails.avatar_url} alt="Avatar" className="bot-avatar" />}
          <p>Health: {botDetails.health}</p>
          <p>Damage: {botDetails.damage}</p>
          <p>Armor: {botDetails.armor}</p>
          <p>Bot Class: {botDetails.bot_class}</p>
          <p>Catchphrase: {botDetails.catchphrase}</p>
          <p>Created at: {botDetails.created_at}</p>
          <p>Updated at: {botDetails.updated_at}</p>
          <button onClick={handleEnlist}>Enlist</button>
          <button onClick={handleDischarge} className="discharge-button">X</button>
          <br />
          <Link to="/">Back to Bot Collection</Link>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default BotSpecs;