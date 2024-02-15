const axios = require('axios').default;

const initBot = async function ({ beginFrom = 538 } = []) {


    try {

        const data = require('./github-1.js');

        for await (const [index, user] of data.reverse().entries()) {

            if (index > beginFrom) {

                try {

                    const res = await axios.get('https://api.github.com/users/' + user.identity);

                    if (!res.data.id) {
                        console.log(user.identity, '!!!!new!!!!')
                    } else {
                        console.log(index, user.identity)
                    }
                } catch (error) {
                    console.log('error')
                    await (new Promise(resolve => setTimeout(resolve, 3000)))();
                    initBot({ beginFrom: index })
                    return;
                }
            }
        }

    } catch (error) {
        console.log('error')
    }


}


initBot()