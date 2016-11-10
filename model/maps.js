'use strict'
import mongoose from 'mongoose'
const Schema = mongoose.Schema
const mapSchema =  new Schema({
  owner: {
    type: Schema.Types.ObjectId
    ref: 'users'
  },
  businessName: String,
  pinDrop: [
    {
      pinDropName: String,
      position: {
        lat: String,
        lng: String
      },
      supervisor: {
        type: Schema.Types.ObjectId
        ref: 'users'
      },
      inputTime: Date,
      listField: [
        {
          fieldName: String, // Field Name
          fieldType: String, // Field type [Number]
          isPass: Boolean, // Pass status [true, false]
          targetValue: Number, // 50000
          targetComparison: String, // [gt, lt]
          value: Number // 45000
        }
      ]
    }
  ]
}, {
  timestamps: true
})

export default = mongoose.model('maps', mapSchema)