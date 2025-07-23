// app/api/chat/route.js

export async function POST(req) {
    try {
      const { message } = await req.json()
  
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192', // Fast + smart model
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant.',
            },
            {
              role: 'user',
              content: message,
            },
          ],
        }),
      })
  
      const data = await response.json()
      const aiReply = data.choices?.[0]?.message?.content || 'Sorry, no response.'
  
      return Response.json({ reply: aiReply })
    } catch (error) {
      console.error('Groq API error:', error)
      return Response.json({ reply: 'Error getting response from AI.' }, { status: 500 })
    }
  }
  