import { ApiResponse } from "@/types/api";
import { Car, CarResponse } from "@/types/car";

const  BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCars(): Promise<ApiResponse<Car[]>> {
    try {
        const res = await fetch(`${BASE_URL}/products/category/vehicle`);

        if (!res.ok) {
            return {
                data: null,
                error: { message: "Failed to load vehicles from server.", status: res.status }
            };
        }

        const data: CarResponse = await res.json();
        
        return { data: data.products, error: null };
    } catch (error) {
        return {
            data: null,
            error: { message: error instanceof Error ? error.message : "Unknown network error" }
        };
    }
}

export async function getCarById(id: string): Promise<ApiResponse<Car>> {
    try {
        const res = await fetch(`${BASE_URL}/products/${id}`);

        if (!res.ok) {
            return {
                data: null,
                error: { message: `Car with ID ${id} not found.`, status: res.status }
            };
        }

        const data: Car = await res.json();
        
        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: { message: error instanceof Error ? error.message : "Unknown network error" }
        };
    }
}