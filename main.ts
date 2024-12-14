// server.ts
function getClientHtml(): string {
  return `
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Christmas Quiz</title>
  </head>
  <body>
      <h1>Christmas Quiz</h1>
      <div class="quiz-container">
          <div class="question">
              <h2>1. What is the name of Santa's red-nosed reindeer?</h2>
              <ul class="answers">
                  <li><label><input type="radio" name="q1" value="wrong" id="q1a1"> Dasher</label></li>
                  <li><label><input type="radio" name="q1" value="wrong" id="q1a2"> Prancer</label></li>
                  <li><label><input type="radio" name="q1" value="correct" id="q1a3"> Rudolph</label></li>
                  <li><label><input type="radio" name="q1" value="wrong" id="q1a4"> Blitzen</label></li>
              </ul>
          </div>
          <div class="question">
              <h2>2. What do people traditionally put on top of a Christmas tree?</h2>
              <ul class="answers">
                  <li><label><input type="radio" name="q2" value="correct" id="q2a1"> A star</label></li>
                  <li><label><input type="radio" name="q2" value="wrong" id="q2a2"> A bell</label></li>
                  <li><label><input type="radio" name="q2" value="wrong" id="q2a3"> A candy cane</label></li>
                  <li><label><input type="radio" name="q2" value="wrong" id="q2a4"> A present</label></li>
              </ul>
          </div>
          <div class="question">
              <h2>3. In the song "The Twelve Days of Christmas," how many golden rings are there?</h2>
              <ul class="answers">
                  <li><label><input type="radio" name="q3" value="wrong" id="q3a1"> 3</label></li>
                  <li><label><input type="radio" name="q3" value="correct" id="q3a2"> 5</label></li>
                  <li><label><input type="radio" name="q3" value="wrong" id="q3a3"> 7</label></li>
                  <li><label><input type="radio" name="q3" value="wrong" id="q3a4"> 12</label></li>
              </ul>
          </div>
          <button onclick="submitQuiz()">Submit</button>
          <div class="result" id="result" style="margin-top: 20px; font-size: 18px; font-weight: bold;"></div>
      </div>
      <script>
        window.submitQuiz = function submitQuiz() {
          let score = 0;
          const answers = document.querySelectorAll('input[type="radio"]:checked');
          answers.forEach((answer) => {
            if (answer.value === "correct") score++;
          });
          const result = document.getElementById("result");
          result.textContent = \`You scored \${score} out of 3!\`;
          result.style.color = score === 3 ? "green" : "blue";
        };
      </script>
  </body>
  </html>`;
}


Deno.serve((request: Request) => {
  const { headers } = request;

  // Handle WebSocket connections when requested
  if (headers.get("upgrade") === "websocket") {
    const { socket, response } = Deno.upgradeWebSocket(request);

    socket.onmessage = (_e) => {
      console.log("Received a WebSocket message");
      socket.send("pong");
    };

    return response;
  }

  // Return the HTML content as the default response
  const body = new TextEncoder().encode(getClientHtml());
  return new Response(body, {
    headers: {
      "Content-Type": "text/html",
    },
  });
});