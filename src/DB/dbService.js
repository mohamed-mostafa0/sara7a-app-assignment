export const findOne = async ({model , filter = {} , select = '' , populate = []})=>{
    return await model.findOne(filter).select(select).populate(populate)
}



export const findById = async({model , filter = {} , select='' , populate = []})=>{
    return await model.findById(filter).select(select).populate(populate)
}


export const create = async ({model , data = [{}] , options = {validateBeforeSave :true}})=>{
    return await model.create(data , options)
}

export const findOneAndUpdate = async({model , filter = {} , dataToUpdate = {} , options = {new:true}})=>{
    return await model.findOneAndUpdate(filter , dataToUpdate , options)
}


export const findOneAndDelete = async ({model , filter = {} , options = {}})=>{
    return await model.findOneAndDelete(filter , options)
}