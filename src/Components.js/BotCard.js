import { Link } from 'react-router-dom';
import React from 'react';
import "./styles/BotCardStyling.css"

function BotCard({ bot, onEnlist, onDischarge }) {
  
// function to handle enlisting a bot
let handleClick = () => {
    onEnlist(bot);
  };
  
  // function to handle discharging a bot
  let handleDischarge = () => {
    onDischarge(bot);
  };
  let handleEnlist = () => {
    onEnlist(bot);
  };
  return (
    <div className="bot-container" onClick={handleClick}>
      <h2>{bot.name}</h2>
      {bot.avatar_url && <img src={bot.avatar_url} alt="Avatar" className="bot-avatar" />}
      <p>Health: {bot.health}</p>
      <p>Damage: {bot.damage}</p>
      <p>Armor: {bot.armor}</p>
      <p>Bot Class: {bot.bot_class}</p>
      <p>Catchphrase: {bot.catchphrase}</p>
      <p>Created at: {bot.created_at}</p>
      <p>Updated at: {bot.updated_at}</p>
      <button onClick={handleEnlist}>Enlist</button>
      <button onClick={handleDischarge} className="discharge-button">X</button>
      <Link to={`/bots/${bot.id}`}>View Details</Link>
    </div>
  );
}

export default BotCard;