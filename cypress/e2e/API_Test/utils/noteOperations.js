let outh_token;

// Function to get an access token
export async function getAccessToken(email, password) {
  try {
    const response = await cy.request({
      method: 'POST',
      url: 'https://practice.expandtesting.com/notes/api/users/login',
      body: {
        email,
        password
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error(`Failed to login. Status code: ${response.status}`);
    }

    outh_token = response.body.data.token;
    console.log('OAuth Token:', outh_token);
    return outh_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
}

// Function to delete all notes
export async function deleteAllNotes(baseUrl) {
  try {
    // Fetch existing notes
    const response = await cy.request({
      method: 'GET',
      url: `${baseUrl}/notes/api/notes`,
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': outh_token,
      },
    });

    const statusCode = response.status;
    if (statusCode !== 200) {
      throw new Error(`Failed to fetch notes. Status code: ${statusCode}`);
    }

    const notesIds = response.body.data.map((note) => note.id);
    console.log('Fetched notes:', notesIds);

    // Loop through each note ID and delete it
    for (const noteId of notesIds) {
      const deleteResponse = await cy.request({
        method: 'DELETE',
        url: `${baseUrl}/notes/api/notes/${noteId}`,
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': outh_token,
        },
      });

      const deleteStatusCode = deleteResponse.status;
      if (deleteStatusCode === 200) {
        console.log(`Deleted note with ID: ${noteId}`);
      } else {
        console.error(`Failed to delete note with ID: ${noteId}. Status code: ${deleteStatusCode}`);
      }
    }
  } catch (error) {
    console.error('Error deleting notes:', error);
  }
}
