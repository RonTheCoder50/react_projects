export function taskReducer(tasks, action) {
    switch(action.type) {
        case 'add': {
            return [
                ...tasks,
                {
                    id: action.id,
                    name: action.name,
                    city: action.city
                }
            ];
        }

        case 'delete': {
            return tasks.filter(item => item.id !== action.id);
        }

        default: {
            throw Error('Unknwon type -> ', action.type);
        }
    }
}