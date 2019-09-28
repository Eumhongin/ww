let scheme = {
    user_log :{
        0 : {
            email : "String",
            mode : "Login or Logout",
            timestamp : Date.now(),
        }
        //1 : {}...
    },
    users: {
        uid: {
            email: "String",
            password: "HASH",
            name: "String",
            company: {
                name: "String",
                address: "String",
                tel: "Int",
                items: "[String]"
            },
            timestamp: "Int",
            UTCtime: "Date"
        }
    },
    
}

let workflow = {
    0: {
        FinishDate: 30,
        FinishMonth: 9,
        FinishYear: 2019,
        color: "#008cff",
        comment: "코틀린 공부",
        overhead: false,
        startDate: 16,
        startMonth: 9,
        startYear: 2019,
        timestamp: 1568612924362,
        workerID: 0,
        workerName: "남현재"

    }
}





