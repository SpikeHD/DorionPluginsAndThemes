let lastSavedChannel = 0

/**
 * TODO: REWRITE WITH MUTATION OBSERVER
 */

setInterval(() => {
  // Get all messages
  const msgs = document.querySelector('div[class*="messagesWrapper"]')?.querySelectorAll('li')

  // We are probably not viewing a channel, return to prevent error spam
  if (!msgs) return

  const first = msgs[msgs.length - 1]
  const firstID = first.id

  // Check if we have switched channels
  if (firstID !== lastSavedChannel) {
    lastSavedChannel = firstID

    const messages = document.querySelectorAll('div[aria-roledescription="Message"]')

    messages.forEach(m => {
      // Grab the avatar image, since that contains the user id
      const img = m.querySelector('img[class*="avatar"]')
      const id = img?.src?.split('users/')[1]?.split('/')[0] || img?.src?.split('avatars/')[1]?.split('/')[0]
    
      // Assuming we grabbed an ID...
      if (id) {
        // ...grab their username and shove a <span> next to it
        const uname = m.querySelector('span[class*="username"]')

        // Do not add if the id is already there
        if (uname.querySelector('.dorionId')) return

        const newSpan = document.createElement('span')
  
        newSpan.innerHTML = ` - ${id}`
        newSpan.className = 'dorionId'
        newSpan.style.fontSize = '12px'
  
        uname.appendChild(
          newSpan
        )
      }
    })
  }
}, 1000)
