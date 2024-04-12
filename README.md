# ai-sightseeing-nto
-----
[api]()
-----

### Project Documentation: Intelligent Sightseeing Service

#### Overview
This project encompasses the development of an innovative sightseeing information service designed to enhance the travel experience in four cities. Leveraging advanced filtering capabilities, search functionalities, and machine learning models, the service provides users with an intuitive platform to explore, discover, and plan visits to various attractions. The technology stack includes React, Vue, Flask, SQLite, and integrates two machine learning models, enhancing the overall functionality and user experience.

#### Features

1. **Comprehensive Attraction Database**: The service maintains an extensive database of attractions across four cities. Each entry is meticulously categorized and rated, allowing users to effortlessly browse and discover destinations according to their preferences.

2. **Advanced Filtering**: Users can filter attractions based on city, category, and rating, enabling them to tailor their search to their specific interests and requirements.

3. **Title-based Search**: A straightforward search functionality allows users to find attractions by their names, ensuring quick and easy access to desired information.

4. **Intelligent Description-based Search**: Utilizing the CLIP model, the service offers an intelligent search feature where users can query attractions by descriptions. By comparing cosine similarity between description embeddings, it efficiently finds attractions matching the user's input.

5. **Photograph-based Search**: Another application of the CLIP model enables users to search for similar attractions by uploading photographs. This feature uses photo embeddings to find and suggest attractions with visually similar characteristics.

6. **Category Identification from Photos**: The service incorporates a fine-tuned MobileNet model for classifying uploaded images into predefined categories. This functionality assists users in identifying the type of attraction depicted in their photographs.

7. **Route Mapping**: Upon identifying attractions of interest, the service provides a mapping feature that generates optimal routes on a map, facilitating planning and navigation for sightseeing tours. [Geoapify](https://www.geoapify.com/get-started-with-maps-api) is used.

#### Technology Stack

- **Frontend**: Developed using React and Vue, the frontend is designed for an engaging and responsive user interface, ensuring a seamless experience across devices.
  
- **Backend**: Flask serves as the backend framework, handling requests, processing data, and communicating with the SQLite database and machine learning models.
  
- **Database**: SQLite, a lightweight database engine, is utilized for storing and managing the extensive data on attractions, categories, ratings, and user queries.

- **Machine Learning Models**:
  - **CLIP**: Employed for both description-based and photograph-based searches, CLIP's ability to understand and match embeddings from text and images is central to these features.
  - **MobileNet**: This model is fine-tuned to classify images into attraction categories, enhancing the service's capability to process and understand user-uploaded photos.
---
