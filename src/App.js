import React, {useState, useEffect} from "react"
import './App.css';
import BotCollection from './Components.js/BotCollection';
import BotSpecs from "./Components.js/BotSpecs";
import SortBar from "./Components.js/SortBar";
import YourBotArmy from "./Components.js/YourBotArmy";
//for the browser routes
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  //  State variables to manage bot data
  const [enlistedBots, setEnlistedBots] = useState([]);
  const [sortedBots, setSortedBots] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('health'); //current sorting criteria
  const [classFilters, setClassFilters] = useState([]);
  const [enlistedBotClasses, setEnlistedBotClasses] = useState({});

  // Fetch bots on initial rendering and sort based on the sorting criteria
  useEffect(() => {
    fetch('http://localhost:3000/bots')
      .then(response => response.json())
      .then(data => sortBots(data, sortCriteria))
      .catch(error => console.error('Error fetching bots:', error));
  }, [sortCriteria]);

  //Function to add a bot to the enlistedBots Array
  let enlistBot = (bot) => {
    const botClass = bot.bot_class;

    //check if the botclass hasn't been enlisted
    if (!enlistedBotClasses[botClass]) {
      setEnlistedBotClasses({ ...enlistedBotClasses, [botClass]: true }); //update enlisted bots
      setEnlistedBots([...enlistedBots, bot]); //Add bot to enlistedBots
      setSortedBots(sortedBots.filter(sortedBot => sortedBot.id !== bot.id)); //Remove from sortedBots
    }
  };

  // function to remove a bot from the enlistedBots array
  let releaseBot = (bot) => {
    setEnlistedBots(enlistedBots.filter(enlistedBot => enlistedBot.id !== bot.id));
    const botClass = bot.bot_class;
    setEnlistedBotClasses({ ...enlistedBotClasses, [botClass]: false });
  };

  //function to move a bot to the top of the enlisted bots array
  let moveToTop = (bot) => {
    const updatedBots = enlistedBots.filter(enlistedBot => enlistedBot.id !== bot.id);
    setEnlistedBots([bot, ...updatedBots]);
  };

  //function to discharge a bot using a delete request state then update state
  let dischargeBot = (bot) => {
    fetch(`http://localhost:3000/bots/${bot.id}`, {
      method: 'DELETE',
    })
    .then(() => {
      setEnlistedBots(enlistedBots.filter(enlistedBot => enlistedBot.id !== bot.id));
      const botClass = bot.bot_class;
      setEnlistedBotClasses({ ...enlistedBotClasses, [botClass]: false });
    })
    .catch(error => console.error('Error discharging bot:', error));
  };

  // function to sort bot based on a given criteria
  let sortBots = (bots, criteria) => {
    const sorted = [...bots].sort((a, b) => b[criteria] - a[criteria]);
    setSortedBots(sorted);
  };

  //function to handle changes in the sorting criteria
  let handleSortChange = (criteria) => {
    setSortCriteria(criteria);
  };

  //function to handle changes in the class filters
  let handleClassFilterChange = (classFilter) => {
    if (classFilters.includes(classFilter)) {
      setClassFilters(classFilters.filter(filter => filter !== classFilter));
    } else {
      setClassFilters([...classFilters, classFilter]);
    }
  };

  const filteredBots = sortedBots.filter(bot => {
    // checks if there are no class filters applied
    if (classFilters.length === 0) 
      {return true;} //if no filters return all bots

    // checks if the bot class matches any of the class filters
    return classFilters.includes(bot.bot_class);
  });

  return (
    <Router>
      <div className="App">
        <SortBar
          onSort={handleSortChange}
          onClassFilterChange={handleClassFilterChange}
          classFilters={classFilters}
        />
        <Routes>
          <Route path="/bots/:botId" element={<BotSpecs />} />
          <Route path="/your-bot-army" element={<YourBotArmy
            enlistedBots={enlistedBots}
            onReleaseBot={releaseBot}
            onMoveToTop={moveToTop}
            onDischargeBot={dischargeBot}
          />} />
          <Route path="/" element={<div className="container">
            <YourBotArmy
              enlistedBots={enlistedBots}
              onReleaseBot={releaseBot}
              onMoveToTop={moveToTop}
              onDischargeBot={dischargeBot}
            />
            <h1 className="h1">Bot Management System</h1>
            <BotCollection bots={filteredBots} onEnlist={enlistBot} />
          </div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
