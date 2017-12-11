import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { createContainer } from 'meteor/react-meteor-data';

import { Recommendations } from '../api/recommendations.js';

class SavedPlaylist extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
    };

    console.log(Recommendations.find({ user: Meteor.user() }).fetch());
  }

  render() {
    return (
      <div>
            <div>
              <div className="prompt">

                <div className="logo">
                  <img src="/white-music-512.png"/>
                </div><br/>
                <h1>SongExplorer</h1>
                <p>These are your saved playlists:</p>
              </div>
              <div>
                {this.props.all.map((instance, idxa) => (
                  <div key={idxa}>
                    <h5>You searched for: </h5>
                    <h2>{instance.query}</h2>
                    <div className="artistHolder">
                      {instance.results.map((artist, idx) => (
                        <div className="artistsaved" key={idx}>
                          <div className="description">
                            <span>{artist.Name}</span>
                            <br/>
                            <a className="btn sm" href={artist.wUrl}>Read more about the artist</a>
                            <br/>
                            <a className="btn sm" href={artist.yUrl}>Watch the video</a>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="clearfix"></div>
                  </div>
                ))}
              </div>
              
            </div>
      </div>
    )
  }
}

SavedPlaylist.propTypes = {
  all: PropTypes.array.isRequired,
};

export default createContainer((props) => {
  Meteor.subscribe('recommendations');
  return {
    all: Recommendations.find({ user: Meteor.user() }).fetch().reverse(),
  };
}, SavedPlaylist);