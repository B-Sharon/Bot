import React from "react";

function YourBotArmy({ enlistedBots, onReleaseBot, onMoveToTop ,onDischargeBot }) {
    // function to handle releasing a bot
  const handleRelease = (bot) => {
      onReleaseBot(bot);
    };

  //function to handle moving a bot to the top
    const handleMoveToTop = (bot) => {
      onMoveToTop(bot);
    };

    //function to handle discharging a bot
    const handleDischarge = (bot) => {
      onDischargeBot(bot);
    };
  
    return (
      <div>
        <u>
          <h2 className="h2">Your Selected Bot Army</h2>
        </u>
        <div className="enlisted-bots">
          {/* Map over the enlistedBots array to display each bot */}
          {enlistedBots.map(bot => (
            <div key={bot.id} className="bot-container">
              <h3>{bot.name}</h3>
              {bot.avatar_url && ( // Conditionally render the avatar image
                <img src={bot.avatar_url} alt="Avatar" className="bot-avatar" />
              )}
              <p>Health: {bot.health}</p>
              <p>Damage: {bot.damage}</p>
              <p>Armor: {bot.armor}</p>
              <p>Bot Class: {bot.bot_class}</p>
              <p>Catchphrase: {bot.catchphrase}</p>
              <p>Created at: {bot.created_at}</p>
              <p>Updated at: {bot.updated_at}</p>
              <button onClick={() => handleRelease(bot)}>Release</button>
              <button onClick={() => handleMoveToTop(bot)}>Move to Top</button>
              <button onClick={() => handleDischarge(bot)} className="discharge-button">X</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
  

  export default YourBotArmy;