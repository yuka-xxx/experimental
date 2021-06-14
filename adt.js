
const construct = (t, f) => Object.assign(Object.create(t), { match: f })


const Maybe = {}

// data constructors for Maybe
const Nothing = () => construct(Maybe, p => p.Nothing())
const Just = x => construct(Maybe, p => p.Just(x))

// catamorphism for Maybe
const maybe = (z, f) => m => m.match({ Nothing:() => z, Just:(x) => f(x) })


const List = {}

// data constructors for Maybe
const Nil = () => construct(List, p => p.Nil())
const Cons = (x, xs) => construct(List, p => p.Cons(x, xs))

// catamorphism for List
const list = (z, f) => xs => xs.match({ Nil:() => z, Cons:(x, xs) => f(x, list(z, f)(xs)) })


const head = (xs) => xs.match({ Nil:() => Nothing(), Cons:(y, _) => Just(y) })
const tail = (xs) => xs.match({ Nil:() => Nothing(), Cons:(_, ys) => Just(ys) })
const sum = list(0, (x, y) => x + y)


const xs = Cons(1, Cons(2, Cons(3, Nil())))

console.log(sum(xs))

head(xs).match({
    Nothing:() => console.log('xs is empty'),
    Just:(x) => console.log('head(xs) = ' + x)
})