import { any, number, object, string, TypeOf } from 'zod';

const payload = {
    body: object({
        title: string({
            required_error:"Title is required"
        }),
        description: string({ required_error:"description is required"}),
        price: number({
            required_error:"price is required"
        }),
        image: string({
            required_error:"image is required"
        }),
    })
}

const parama ={
    params: object({
        productId: any({
            required_error: "Product ID is required"
        }),
    })
}

export const createProductSchema =object({
    ...payload
})

export const updateProductSchema =object({
    ...payload,
    ...parama,
})

export const deleteProductSchema =object({
   
    ...parama,
})

export const getProductSchema =object({
    ...parama,
})


export type createProductInput = TypeOf<typeof createProductSchema>
export type updateProductInput = TypeOf<typeof updateProductSchema>
export type deleteProductInput = TypeOf<typeof deleteProductSchema>
export type getProductInput = TypeOf<typeof getProductSchema>
