const Todo = require("../lib/todo");
const TodoList = require("../lib/todolist");

describe("TodoList", () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo("Buy milk");
    todo2 = new Todo("Clean room");
    todo3 = new Todo("Go to the gym");

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  // your tests go here
  test("todolist has a size of 3", () => {
    expect(list.size()).toBe(3);
  });

  test("returns an array", () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test("first item is todo1", () => {
    expect(list.first()).toEqual(todo1);
  });

  test("last item to be todo3", () => {
    expect(list.last()).toEqual(todo3);
  });

  test("shift method removes and return the first todo from the list", () => {
    expect(list.shift()).toEqual(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  test("pop method removes and return the last todo from the list", () => {
    expect(list.pop()).toEqual(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  test("isDone method returns false", () => {
    expect(list.isDone()).toBe(false);
  });

  test("isDone method returns true", () => {
    todo1.markDone();
    todo2.markDone();
    todo3.markDone();
    expect(list.isDone()).toBe(true);
  });

  test("add thows TypeError when non todo item is added", () => {
    expect(() => list.add({ title: "Run", done: false })).toThrow(TypeError);
    expect(() => list.add("hello")).toThrow(TypeError);
    expect(() => list.add(new TodoList("world"))).toThrow(TypeError);
  });

  test("itemAt returns the item at given index", () => {
    expect(list.itemAt(0)).toEqual(todo1);
    expect(list.itemAt(2)).toEqual(todo3);
    expect(() => list.itemAt(3)).toThrow(ReferenceError);
  });

  test("markDoneAt marks a todo at a given index done", () => {
    list.markDoneAt(0);
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(false);
    expect(todo3.isDone()).toBe(false);

    expect(() => list.markDoneAt(4)).toThrow(ReferenceError);
  });

  test("markUndoneAt marks a todo at a given index undone", () => {
    expect(() => list.markUndoneAt(5)).toThrow(ReferenceError);
    todo1.markDone();
    todo2.markDone();
    todo3.markDone();

    list.markUndoneAt(1);
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(false);
    expect(todo3.isDone()).toBe(true);
  });

  test("markAllDone marks all todo done", () => {
    list.markAllDone();
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(true);
    expect(list.isDone()).toBe(true);
  });

  test("removeAt removes a todo at the given index and returns it", () => {
    expect(() => list.removeAt(4)).toThrow(ReferenceError);

    list.removeAt(1);
    expect(list.toArray()).toEqual([todo1, todo3]);
  });

  test("toString returns string representation of the list", () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(string);
  });

  test("toString returns different string for done todo", () => {
    let string = `---- Today's Todos ----
[X] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    list.markDoneAt(0);
    expect(list.toString()).toBe(string);
  });

  test("toString returns different string when all todos are done", () => {
    let string = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;

    list.markAllDone();
    expect(list.toString()).toBe(string);
  });

  test("forEach iterates over the array", () => {
    let todos = [];
    list.forEach(todo => todos.push(todo));

    expect(todos).toEqual([todo1, todo2, todo3]);
  });

  test("filter returns a list of filtered items", () => {
    todo2.markDone();
    const newList = new TodoList(list.title);
    newList.add(todo2);

    expect(newList.title).toBe(list.title);

    const doneTodos = list.filter(todo => todo.isDone());
    expect(doneTodos.toString()).toBe(newList.toString());
  });

  test("getTitle returns the title of the todo list", () => {
    const title = "Buy milk";
    expect(todo1.getTitle()).toBe(title);
  });

  test("findByTitle returns a todo with the given title", () => {
    expect(list.findByTitle("Buy milk")).toEqual(todo1);
  });

  test("allDone returns all done todos", () => {
    todo1.markDone();
    todo3.markDone();

    const newList = new TodoList(list.title);
    newList.add(todo1);
    newList.add(todo3);

    expect(list.allDone()).toEqual(newList);
  });

  test("notAllDone returns all not done todos", () => {
    const newList = new TodoList(list.title);
    todo3.markDone();
    newList.add(todo1);
    newList.add(todo2);

    expect(list.allNotDone()).toEqual(newList);
  });

  test("markDone method of TodoList marks the todo matching the given title done", () => {
    console.log(todo1);
    list.markDone("Buy milk");
    expect(todo1.isDone()).toBe(true);
  });

  test("markAllUndone marks all todo not done", () => {
    list.markAllDone();
    expect(list.isDone()).toBe(true);

    list.markAllUndone();
    expect(list.isDone()).toBe(false);
  });
});
