# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


This is a fullstack website using Vite + React.js as Frontend and Flask(Python) as Backend Server and MongoDB as Database. 
Backened is also deployed in my github account. click the link to see the repository https://github.com/Pradeep1G/TaskServer. 
This project is about to store the users Events in three different categories - ToDo, Doing and Done. 
Easily we can update and remove events from any category and change category of an event by dragging them to other category. 
We can also change colour theme of the web page. 
And also we can add as many as workspaces. 

This is Login Page Image                                                                              

![Screenshot 2023-09-09 192159](https://github.com/Pradeep1G/TaskerApp/assets/98323512/ed7ffb28-5056-4e42-a257-3bc56ba01a97)


This is Register page image                                                                                       

![Screenshot 2023-09-09 192226](https://github.com/Pradeep1G/TaskerApp/assets/98323512/c7863bc4-fafa-4186-ace3-296cf5b15739)

This is Home page showing Three sections of ToDo , Doing , Done                                                     

![Screenshot 2023-09-09 192401](https://github.com/Pradeep1G/TaskerApp/assets/98323512/428a6ffc-6618-4f80-8be1-2a3187b35097)

This is showing the details of the Work                                                                               

![Screenshot 2023-09-09 192542](https://github.com/Pradeep1G/TaskerApp/assets/98323512/95869ccf-5000-4e37-b4df-7ed8875ab9ae)

This is to change the background theme of the Website                                                                

![Screenshot 2023-09-09 192831](https://github.com/Pradeep1G/TaskerApp/assets/98323512/2da03599-0ae7-4a35-97cf-c5d0b96cfe8c)

This is showing the profile os the user                                                                             

![Screenshot 2023-09-09 192845](https://github.com/Pradeep1G/TaskerApp/assets/98323512/9424d462-8231-454e-8134-15e80fa5b68c)

This is showing that how to change and add workspaces to your account                                                  

![Screenshot 2023-09-09 192944](https://github.com/Pradeep1G/TaskerApp/assets/98323512/8e1b07bc-5072-4911-b90e-f24a544385fe)



This is the structure of the data in my MongoDb database                                                             
{
    "data": [
        {
            "WorkSpace0": {
                "Doing": {
                    "1": {
                        "deadLine": "01-01-2023",
                        "description": "a",
                        "startDate": "01-01-2023",
                        "status": "a"
                    },
                    "AllWorks": [
                        "Work4",
                        "Work6",
                        "Work7",
                        "Work8",
                        "Work8",
                        "Work9"
                    ],
                    "Work4": {
                        "deadLine": "22-09-2023",
                        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                        "startDate": "08-09-2023",
                        "status": "Currently working on this portion"
                    },
                    "Work6": {
                        "deadLine": "01-01-2023",
                        "description": "",
                        "startDate": "01-01-2023",
                        "status": ""
                    },
                    "Work7": {
                        "deadLine": "01-01-2023",
                        "description": "",
                        "startDate": "01-01-2023",
                        "status": ""
                    },
                    "Work8": {
                        "deadLine": "01-01-2023",
                        "description": "",
                        "startDate": "01-01-2023",
                        "status": ""
                    },
                    "Work9": {
                        "deadLine": "01-01-2023",
                        "description": "",
                        "startDate": "01-01-2023",
                        "status": ""
                    }
                },
                "Done": {
                    "AllWorks": [
                        "Work5"
                    ],
                    "Work5": {
                        "deadLine": "01-01-2023",
                        "description": "afsgd",
                        "startDate": "01-01-2023",
                        "status": "fsgdfn"
                    }
                },
                "ToDo": {
                    "AllWorks": [
                        "Work1",
                        "Work2",
                        "Work3"
                    ],
                    "Work1": {
                        "deadLine": "01-01-2023",
                        "description": "pih",
                        "startDate": "01-01-2023",
                        "status": "nkj"
                    },
                    "Work2": {
                        "deadLine": "01-01-2023",
                        "description": "",
                        "startDate": "01-01-2023",
                        "status": ""
                    },
                    "Work3": {
                        "deadLine": "06-09-2023",
                        "description": "dfg",
                        "startDate": "15-09-2023",
                        "status": ""
                    }
                },
                "bgColor": "green"
            },
            "WorkSpace1": {
                "Doing": {
                    "1": {
                        "deadLine": "01-01-2023",
                        "description": "a",
                        "startDate": "01-01-2023",
                        "status": "a"
                    },
                    "AllWorks": []
                },
                "Done": {
                    "AllWorks": [
                        "jlkjn",
                        "ghj",
                        "kj",
                        "cvdscdf"
                    ],
                    "cvdscdf": {
                        "deadLine": "01-01-2023",
                        "description": "zcxvdcsfd",
                        "startDate": "01-01-2023",
                        "status": "zcxvscd"
                    },
                    "ghj": {
                        "deadLine": "01-01-2023",
                        "description": "gnh",
                        "startDate": "01-01-2023",
                        "status": "gcn"
                    },
                    "jlkjn": {
                        "deadLine": "01-01-2023",
                        "description": "ibu;khljk",
                        "startDate": "01-01-2023",
                        "status": "hbkj"
                    },
                    "kj": {
                        "deadLine": "01-01-2023",
                        "description": "pih",
                        "startDate": "01-01-2023",
                        "status": "nkj"
                    }
                },
                "ToDo": {
                    "AllWorks": [
                        "asd"
                    ],
                    "asd": {
                        "deadLine": "01-01-2023",
                        "description": "asd",
                        "startDate": "01-01-2023",
                        "status": "as"
                    }
                },
                "bgColor": "green"
            },
            "WorkSpace2": {
                "Doing": {
                    "AllWorks": []
                },
                "Done": {
                    "AllWorks": []
                },
                "ToDo": {
                    "AllWorks": []
                },
                "bgColor": "#fff"
            },
            "WorkSpace3": {
                "Doing": {
                    "AllWorks": []
                },
                "Done": {
                    "AllWorks": []
                },
                "ToDo": {
                    "AllWorks": []
                },
                "bgColor": "#fff"
            },
            "WorkSpace4": {
                "Doing": {
                    "AllWorks": [
                        "aefrsg",
                        "xxx",
                        "fedrfhg"
                    ],
                    "aefrsg": {
                        "deadLine": "01-01-2023",
                        "description": "",
                        "startDate": "01-01-2023",
                        "status": ""
                    },
                    "fedrfhg": {
                        "deadLine": "01-01-2023",
                        "description": "",
                        "startDate": "01-01-2023",
                        "status": ""
                    },
                    "xxx": {
                        "deadLine": "09-09-2023",
                        "description": "dasfdgrhf",
                        "startDate": "09-09-2023",
                        "status": "123456789"
                    }
                },
                "Done": {
                    "AllWorks": [
                        "rgthdfjg"
                    ],
                    "rgthdfjg": {
                        "deadLine": "01-01-2023",
                        "description": "",
                        "startDate": "01-01-2023",
                        "status": ""
                    }
                },
                "ToDo": {
                    "AllWorks": [
                        "sdvfbdg",
                        "Hshs"
                    ],
                    "Hshs": {
                        "deadLine": "01-01-2023",
                        "description": "Hzv",
                        "startDate": "01-01-2023",
                        "status": "Zgz"
                    },
                    "sdvfbdg": {
                        "deadLine": "01-01-2023",
                        "description": "",
                        "startDate": "01-01-2023",
                        "status": ""
                    }
                },
                "bgColor": "#fff"
            },
            "_id": "64f607413b49a69c4e5bd1ac"
        }
    ]
}

