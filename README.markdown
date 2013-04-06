Braktif
=======

Braktif is an esoteric programming language very similar to
_Brainfuck F_ and _Archway_, with a small but significant
difference: Braktif is formulated as a 28-state cellular automaton.

Braktif playfields are divided into a program on the right and
a data storage area on the left.  (The data storage area can be
considered to extend indefinately to the left.)  The program
and data area are connected by a "bus".  On the bus sit the
instruction pointer, which rests underneath the part of the
program which is currently executing, and the data pointer, which
rests underneath the part of the storage which is currently being
addressed.  The instruction pointer and data pointer communicate
by means of signals (from the IP to the DP) and replies (from the
DP to the IP) sent along the bus.

The instructions of a Braktif program resemble those of Smallfuck
or Brainfuck F:

    *   flip current data bit
    >   advance DP one cell to the right
    <   advance DP one cell to the left
    [   if current data bit == 0, skip to matching ]
    ]   skip back to matching [

The structure of Braktif programs resembles that of Archway.  Each
nested loop must be raised up one level.  In addition, extra space
must be left after `[` instructions, and at least one non-`[]`
instruction must occur after a `]` instruction, so that signals have
sufficient space in which to propagate.

The data storage area of a Braktif playfield resembles the tape of
a Brainfuck F program (or a Smallfuck program, if an arbitrary limit
is imposed on it) except that it is bounded on the *right*, not the
left.

The final result of all this is that the following Brainfuck F
program translates to the following Braktif program (the `...`
indicates the quiescent repeating pattern extending off to infinity):

Brainfuck F:

    +[>+]

Braktif:

                          <*
    ... 00000000000000 *[---]
    ... -------------d-i-   --

So... why Braktif?

- eliminates "spooky action at a distance" from the Brainfuck model:
  the communication between the code and the tape is made explicit
  (and explicitly planar, FWIW WRT the wire-crossing problem.)
- horribly inefficient because of this.  Flipping the _n_'th data cell
  from the _m_'th instruction of the program is now an _O(n+m)_
  operation.  What fun!
- makes a passable "poor man's visual debugger" for Brainfuck F.
- makes experimenting with concurrent models easily.  For example it
  might be feasible to add a few states what would act as a simple
  mutex so that two different programs could share one data store.

Finally, I do not claim that this is the most efficient formulation
imaginable... there is certainly room for optimization.  For
example, half of the `Tool` states could probably be done away with
entirely if the signals were to transition themselves directly into
responses.  But a minimum of states is not the real goal (otherwise
one could just settle for John Conway's Game of Life and be done
with it,) and the `Tool` states lend a certain straightforwardness.
