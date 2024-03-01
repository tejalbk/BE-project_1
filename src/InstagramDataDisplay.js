import React, { useEffect, useState } from 'react';

const InstagramDataDisplay = () => {
  const [postData, setPostData] = useState(null);

  // Replace 'YOUR_INSTAGRAM_POST_DATA_URL' with the URL where you have the fetched Instagram post data
  const instagramPostDataUrl = 'https://graph.facebook.com/v19.0/17841464752533463/media?origin_graph_explorer=1&transport=cors&origin_graph_explorer=1&transport=cors&access_token=EAAPyLUbfkNMBOZBZACuJwfCixAPpl9CZBHsGrQ4cG9rmuMzk5fwFZCIYWf9cEEb4dGc4QZBLpwtb0mpVZAvbYInfVynERzDddM3fWgUmWw9PZB15pSQIZCZAZCGXh58Hhs0FvbLwsJRZAf9fow5Wobt5rYSFwUiS4qRmdvG4zBJZC22c5kzVgEVo50G6Oz26V3OE207fMyyfeXZCZBZBZCMhCMJTpHvArIVvPm8ZD';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(instagramPostDataUrl);
        const data = await response.json();
        setPostData(data);
      } catch (error) {
        console.error('Error fetching Instagram post data:', error);
      }
    };

    fetchData();
  }, [instagramPostDataUrl]);

  return (
    <div className="InstagramDataDisplay">
      <h1>Instagram Post Data</h1>
      <pre>{JSON.stringify(postData, null, 2)}</pre>
    </div>
  );
};

export default InstagramDataDisplay;



// const accessToken = 'EAAPyLUbfkNMBOxf8JamyZCCQJEClADqMU8S3W8Lz742nuG2W3ve482vb3pEchhgwO0ZCxmrfrnBZCzEL6t5rlDFiJWu5P4SGYv2v0zZCyfmv4cd8JcO2ZBWLtrQ6NIBRRNLpUp1RvD0gZBDtpc0wzrV77IT4LFMipJxIK875ZCD7IDZArhMpsZA9rh7q0o7CdU1PbAWsAh0ZAGHICbhfGSHBQXhZCvWuKsZD';