import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import SavedPlaylist from "./SavedPlaylist.jsx";
import Recommendation from "./Recommendation.jsx";
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

import { Recommendations } from '../api/recommendations.js';

// import $ from ‘jquery’;
// import { findDOMNode } from ‘react-dom’;

 
class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            recommendations: false,
            name: '',
            list: []
        }
        this.handle = this.handle.bind(this);
        this.getSongList = this.getSongList.bind(this);
        this.recommendations = this.recommendations.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this)
    }

    recommendations() {
      let value = this.state.recommendations;
      this.setState({recommendations: !value})
    }

    handleNameChange(evt) {
      this.setState({ name: evt.target.value });
      // console.log(this.state);
    }

    handle() {
      // console.log(this.getSongList())
    }

    getSongList() {
      let _this = this;
      $.getJSON('https://www.tastekid.com/api/similar?k=293048-Songexpl-Z7I5SOF5&q=' + this.state.name + '&info=1&type=music&callback=?')
        .then(function(data) {
          _this.setState({list: data.Similar.Results});
          // console.log(data.Similar.Results);

          // Recommendations.insert({
          //   user: _this.props.currentUser,
          //   query: _this.state.name,
          //   results: data.Similar.Results
          // });

          Meteor.call('recommendations.insertRecommentation', _this.props.currentUser, data.Similar.Results, _this.state.name);
        });
    }
    
    render(){
        return(
            <div className="App">
                <div className="login">
                    <AccountsUIWrapper />
                </div>
                <header>
                { this.props.currentUser ?
                  <a className="btn" onClick={this.recommendations}>{
                    this.state.recommendations ? <span>Go Back</span> :
                    <span>Recommendation history</span>
                  }</a> : <div></div>
                }
                </header>

                <div className="app-body">
                { this.state.recommendations ?
                    <SavedPlaylist handler={this.submit}/> :
                    <div>
                        { this.props.currentUser ?
                            <div>
                              <div className="prompt">

                                <div className="logo">
                                  <img alt="logo" src="/white-music-512.png"/>
                                </div><br/>
                                <h1>SongExplorer</h1>
                                <p>Enter a list of artists to get started!</p>
                                <input aria-label="Search bar"
                                type="text"
                                placeholder={`Beyoncé, Shakira`}
                                value={this.state.name}
                                onChange={this.handleNameChange}
                                />
                                <a className="btn" onClick={this.getSongList}>Generate playlist</a>
                              </div>
                              <div className="artistHolder">
                                {this.state.list.map((artist, idx) => (
                                  <div className="artist" key={idx}>
                                    <div className="iframeholder">
                                      <div className="videoWrapper">
                                          <iframe title={artist.Name} src={artist.yUrl} frameBorder = "0" height="" width="">#document</iframe>
                                      </div>
                                    </div>
                                    <div className="description">
                                      {artist.wTeaser}
                                      <br/>
                                      <a className="btn sm" href={artist.wUrl}>Read more</a>
                                    </div>
                                    <div className="clearfix"></div>
                                  </div>
                                ))}
                              </div>
                            </div>:
                            <div className="prompt">

                              <div className="logo">
                                <img alt="logo" src="/white-music-512.png"/>
                              </div><br/>
                              <h1>SongExplorer</h1>
                              <p>Sign in to get started!</p>
                            </div>
                        }
                    </div>
                }
                </div>
                <footer>
            </footer>
            </div>
            
        );
    }
}

App.propTypes = {
  // games: PropTypes.array.isRequired,
  currentUser: PropTypes.object
};

export default createContainer((props) => {
  return {
    // games: Games.find({  }, { sort: { score: -1 }, limit: 10 }).fetch(),
    currentUser: Meteor.user()
  };
}, App);