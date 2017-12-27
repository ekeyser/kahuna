import React, { Component } from 'react';
// import { PropTypes } from 'prop-types';
import AWS from 'aws-sdk';
import apigClientFactory from 'aws-api-gateway-client';
import Users from '../../components/Users';
import './index.css';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  componentWillMount() {
    const userPool = 'us-west-2:2440ab57-1a73-4701-91a1-0bfbf60a58a2';
    const token = localStorage.getItem('id_token');
    AWS.config.region = 'us-west-2';
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: userPool,
      Logins: {
        '***REMOVED***rx.auth0.com': token,
      },
    });

    const self = this;
    AWS.config.credentials.get(() => {
      const config = {
        invokeUrl: 'https://api.***REMOVED***rx.io',
        accessKey: AWS.config.credentials.accessKeyId,
        secretKey: AWS.config.credentials.secretAccessKey,
        sessionToken: AWS.config.credentials.sessionToken,
        region: 'us-west-2',
      };

      const apigClient = apigClientFactory.newClient(config);

      apigClient.invokeApi({}, '/cut/users', 'GET', {}, {})
        .then((response) => {
          self.setState(() => ({ users: response.data }));
        })
        .catch((err) => {
          console.warn(err);
        });
    });
  }

  render() {
    const { users } = this.state;
    return (
      <div className="Admin">
        <div className="lander">
          <h1>Admin</h1>
          <h3>Search</h3>
          <form>
            <input typeof="text" />
          </form>
          <Users users={users} />
        </div>
      </div>
    );
  }
}

export default Admin;
