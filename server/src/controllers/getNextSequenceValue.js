export const getNextSequenceValue = async (tx, name, startValue = 1) => {
  try {
    // 1. First, try to find and increment the sequence in one atomic operation.
    // This is the optimistic path and will work for all subsequent calls after creation.
    const sequence = await tx.sequence.update({
      where: { name },
      data: {
        lastValue: {
          increment: 1,
        },
      },
    });
    return sequence.lastValue;
  } catch (error) {
    // 2. If the update fails because the record doesn't exist (Prisma error P2025),
    // it means this is the first time we're using this sequence name.
    if (error.code === "P2025") {
      // 3. Create the sequence with its starting value.
      await tx.sequence.create({
        data: {
          name: name,
          lastValue: startValue,
        },
      });
      // 4. Return the starting value as the first number in the sequence.
      return startValue;
    }
    // 5. If it's a different error (e.g., a database connection issue),
    // re-throw it so the transaction can be rolled back.
    throw error;
  }
};
