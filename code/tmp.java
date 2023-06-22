public class TwoLevelQueue<T> {
  private Node<T> q1;
  private Node<T> tealQ1;
  private Node<T> q2;
  private Node<T> tealQ2;

  public boolean isEmpty() {
    return q1 == null && q2 == null;
  }

  public void insert(T x, int y) {
    if (y == 1) {
      if (q1 == null) {
        q1 = new Node<T>(x);
      } else if (tealQ1 == null) {
        tealQ1 = new Node<T>(x);
        q1.setNext(tealQ1);
      } else {
        tealQ1.setNext(new Node<T>(x));
        tealQ1 = tealQ1.getNext();
      }
    } else if (y == 2) {
      if (q2 == null) {
        q2 = new Node<T>(x);
      } else if (tealQ2 == null) {
        tealQ2 = new Node<T>(x);
        q2.setNext(tealQ2);
      } else {
        tealQ2.setNext(new Node<T>(x));
        tealQ2 = tealQ2.getNext();
      }
    }
  }

  public void remove(T n) {
    Node<T> res = null;
    Node<T> tQ;
    Node<T> tPrev;
    boolean flag = false;
    if (q1 != null) {
      if (n == q1.getValue()) {
        res = q1.getNext();
        q1 = res;
      } else if (q1.hasNext()) {
        tPrev = q1;
        for (
          tQ = q1.getNext();
          tQ != null && !flag;
          tQ = tQ.getNext(), tPrev = tPrev.getNext()
        ) {
          if (tQ.getValue() == n) {
            if (tQ == tealQ1.getValue()) {
              tPrev.setNext(tealQ1);
              flag = true;
            } else {
              tPrev.setNext(tQ.getNext());
              flag = true;
            }
          }
        }
      }
    } else if (q2 != null) {
      flag = false;
      if (n == q2.getValue()) {
        res = q2.getNext();
        q2 = res;
      } else if (q2.hasNext()) {
        tPrev = q2;
        for (
          tQ = q2.getNext();
          tQ != null && !flag;
          tQ = tQ.getNext(), tPrev = tPrev.getNext()
        ) {
          if (tQ.getValue() == n) {
            if (tQ == tealQ2.getValue()) {
              tPrev.setNext(tealQ2);
              flag = true;
            } else {
              tPrev.setNext(tQ.getNext());
              flag = true;
            }
          }
        }
      }
    }
  }

  public int size(int y) {
    int size = 0;
    int i;
    Node<T> tQ;
    if (y == 1) {
      for (tQ = q1; tQ != null; tQ = tQ.getNext(), size++);
    } else if (y == 2) {
      size = 0;
      for (tQ = q2; tQ != null; tQ = tQ.getNext(), size++);
    }

    return size;
  }

  @Override
  public String toString() {
    String str = "q1: [";
    Node<T> tQ;
    for (tQ = q1; tQ != null; tQ = tQ.getNext()) {
      str += tQ.getValue() + ", ";
    }
    str += "] \nq2: [";
    for (tQ = q2; tQ != null; tQ = tQ.getNext()) {
      str += tQ.getValue() + ", ";
    }
    str += "]";
    return str;
  }

  public Node<T> getQ1() {
    return q1;
  }

  public Node<T> getTealQ1() {
    return tealQ1;
  }

  public Node<T> getQ2() {
    return q2;
  }

  public Node<T> getTealQ2() {
    return tealQ2;
  }
}
