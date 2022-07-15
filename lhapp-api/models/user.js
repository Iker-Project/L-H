class User{
    constructor(){
        this.super();
    }

    static async recordMainData(data){
        const newUser = data
        newUser.userData = {
            "homeData": {},
            "medicalHistoryData": {},
            "scheduleData": {},
            "medicalCardsData": {}
        }

        console.log('New User: ', newUser);

        return newUser
    }
}

module.exports = User
