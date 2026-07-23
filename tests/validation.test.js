test("Status values should be valid", () => {

    const validStatuses = [
        "todo",
        "in_progress",
        "done"
    ];

    expect(validStatuses.includes("done"))
        .toBe(true);

    expect(validStatuses.includes("invalid"))
        .toBe(false);

});


test("Priority values should be valid", () => {

    const validPriorities = [
        "low",
        "medium",
        "high"
    ];

    expect(validPriorities.includes("high"))
        .toBe(true);

    expect(validPriorities.includes("urgent"))
        .toBe(false);

});