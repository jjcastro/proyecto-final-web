import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Recommendation extends Component {
  
    render(){
      var handler = this.props.handler;
        return (
          <div>
            <div>
              <h2>LATEST GAMES</h2>
              <div className="game-box-container">
                {this.props.games.map(function(listValue){
                  // return <GameBox key={listValue._id} game={listValue} handler={handler}/>;
                })}
              </div>
            </div>
            <div className="clearfix"></div>
          </div>
        );
    }
}
 
Recommendation.propTypes = {
  games: PropTypes.array.isRequired,
  handler: PropTypes.func.isRequired
};

export default Recommendation;