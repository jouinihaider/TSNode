import { log } from "console";
import { AppError } from "../errors/AppError";
import { prisma } from "../lib/prisma";
import { Order } from "../types";

export const createOrder = (data: any) => {
  return prisma.order.create({
    data: {
      userId: data.userId,
      total: data.total,
      finalTotal: data.finalTotal,
      discountCode: data?.discountCode,
      items: {
        create: data.items,
      },
    },
    include: {
      items: true,
    },
  });
};

export const getOrders = () => {
  return prisma.order.findMany({
    include: {
      items: true,
    },
  });
};

export const getOrdersPaginate2 = async (query: any) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  console.log("query: ", query);

  const skip = (page - 1) * limit;

  const where: any = {};

  if (query.userId) {
    where.userId = query.userId;
  }

  const [data, total] = await prisma.$transaction([
    prisma.order.findMany({
      skip,
      take: limit,
      where,
      include: { items: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.order.count({ where }),
  ]);

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getOrdersPaginate = async (query: any) => {
  let page: number = query.page || 1;
  let limit: number = query.limit || 10;
  let skip: number = page - 1 * limit;

  //prisma.$transaction((tx) => {
  let result = prisma.order.findMany({
    skip,
    take: limit,
    where: {
      userId: query.userId,
    },
  });
  //});
  let total: number = prisma.order.count({ where: { userId: query.userId } });
  return {
    data: result,
    limit,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const getOrderById = (id: string) => {
  const order = prisma.order.findUnique({
    where: { id },
    include: {
      items: true,
    },
  });
  return order;
};

export const updateOrderByTransaction = (id: string, data: any) => {
  return prisma.$transaction(async (tx) => {
    const orderExistence = await tx.order.findUnique({
      where: { id },
      include: {
        items: true,
      },
    });
    console.log("data: ", data);

    if (!orderExistence) throw new AppError("order not found", 400);

    // await tx.orderItem.deleteMany({
    //   where: {
    //     orderId: id,
    //   },
    // });

    const updated = await tx.order.update({
      where: {
        id: id,
      },
      data: data,
      include: {
        items: true,
      },
    });

    return updated;
  });
};

export const updateOrder = (id: string, data: any) => {
  return prisma.order.update({ where: { id }, data });
};

export const deleteOrder = (id: string) => {
  return prisma.order.delete({ where: { id } });
};
