const axios = require('axios').default;
const data = require('./github-1.js');

class Checker {
    constructor() {
    }

    initBot = async function ({ beginFrom = 538 } = []) {


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
                    await new Promise(resolve => setTimeout(resolve, 5000));
                    this.initBot({ beginFrom: index })
                    return;
                }
            }
        }


    }

}

const checker = new Checker();

checker.initBot();