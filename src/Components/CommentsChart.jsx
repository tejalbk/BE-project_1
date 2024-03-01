import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const CommentsChart = () => {
  const chartRef = useRef(null);
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    // Replace 'YOUR_ACCESS_TOKEN' with your actual Facebook Graph API access token
    const accessToken = 'EAAPyLUbfkNMBOZBZACuJwfCixAPpl9CZBHsGrQ4cG9rmuMzk5fwFZCIYWf9cEEb4dGc4QZBLpwtb0mpVZAvbYInfVynERzDddM3fWgUmWw9PZB15pSQIZCZAZCGXh58Hhs0FvbLwsJRZAf9fow5Wobt5rYSFwUiS4qRmdvG4zBJZC22c5kzVgEVo50G6Oz26V3OE207fMyyfeXZCZBZBZCMhCMJTpHvArIVvPm8ZD';

    // Replace the URL with the actual URL that provides multiple post IDs
    const url = 'https://graph.facebook.com/v19.0/17841464752533463/media?origin_graph_explorer=1&transport=cors&access_token=' + accessToken;

    const fetchPostData = async () => {
      try {
        const response = await axios.get(url);
        const posts = response.data.data;

        const requests = posts.map(post => 
          axios.get(`https://graph.facebook.com/v19.0/${post.id}?fields=comments_count&access_token=${accessToken}`)
        );

        const responses = await Promise.all(requests);
        const postData = responses.map(response => response.data.comments_count);
        setPostData(postData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPostData();
  }, []);

  useEffect(() => {
    // Create or update the chart once the data is available
    if (postData.length > 0) {
      // Destroy the previous chart if it exists
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const ctx = document.getElementById('myChart');
      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: postData.map((_, index) => `Post ${index + 1}`),
          datasets: [{
            label: 'Comment Count',
            data: postData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [postData]);

  return (
    <div>
      <canvas id="myChart" width="400" height="200"></canvas>
    </div>
  );
};

export default CommentsChart;
