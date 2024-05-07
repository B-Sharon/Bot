import React from "react";
import { Link } from "react-router-dom";
import BotCard from "./BotCard";
import "./styles/BotCollectionStyling.css"

function BotCollection({ bots, onEnlist }) {
    return (
      <div className="bot-container-wrapper">
        {bots.map(bot => (
          <div key={bot.botId}>
            <Link to={`/bots/${bot.botId}`}>
              {bot.name}
            </Link>
            <BotCard key={bot.id} bot={bot} onEnlist={() => onEnlist(bot)} />
          </div>
        ))}
      </div>
    );
  }
  
  export default BotCollection;