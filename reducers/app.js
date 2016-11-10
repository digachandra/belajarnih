import {ADD_DATA, EDIT_DATA, DELETE_DATA, ADD_COMMENT} from '../constants/ActionTypes'

const initialState = [
  {
    id: 0,
    picture: 'https://randomuser.me/api/portraits/men/10.jpg',
    name: 'John Doe',
    post: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
    comment: [
      {
        id: 0,
        picture: 'https://randomuser.me/api/portraits/men/15.jpg',
        name: 'Ari Adiprana',
        post: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'
      }
    ]
  },
  {
    id: 1,
    picture: 'https://randomuser.me/api/portraits/men/20.jpg',
    name: 'Tevinstein Amos',
    post: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'
  }
]

export default function data(state = initialState, action){
  switch (action.type) {
    case ADD_DATA:
      return [
        {
          id: state.reduce((maxId, data) => Math.max(data.id, maxId), -1) + 1,
          picture: action.picture,
          name: action.name,
          post: action.post
        },
        ...state
      ]
    case EDIT_DATA:
      let tempState = state

      return tempState
    case DELETE_DATA:
      return state.filter(data => data.id !== action.id)
    case ADD_COMMENT:
      let newState = state.map(function(postData){
        if(action.id == postData.id){

          if(postData.comment){
            let newComment = postData.comment.map(function(commentData){
              //console.log(commentData)
              return [
                {
                  id: postData.comment.reduce((maxId, data) => Math.max(data.id, maxId), -1) + 1,
                  picture: action.picture,
                  name: action.name,
                  post: action.post
                },
                ...postData.comment
              ]
            })
            postData.comment = newComment[0]
          } else {
            postData.comment = [
              {
                id: 0,
                picture: action.picture,
                name: action.name,
                post: action.post
              }
            ]
          }

          return postData
        } else {
          return postData
        }
      })

      return newState
    default:
      return state
  }
}
