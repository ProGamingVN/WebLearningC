// ============================================================
// CURRICULUM DATA — CPP-LEARN
// ============================================================

const CURRICULUM = {
  phases: [
    {
      id: 'phase1',
      title: 'Giai đoạn 1 — Nền tảng C++',
      level: 'beginner',
      icon: '🟢',
      desc: 'Xây dựng nền tảng vững chắc từ cú pháp đến STL cơ bản',
      sections: [
        {
          id: 'cpp-basics',
          title: 'Cú pháp cơ bản',
          lessons: [
            {
              id: 'intro',
              title: 'Giới thiệu C++ & Hello World',
              time: '20 phút',
              desc: 'Cấu trúc chương trình, biên dịch, chạy thử',
              tags: ['Nhập môn'],
              content: {
                explain: `
                  <p>C++ là ngôn ngữ lập trình mạnh mẽ, được dùng trong lập trình thi đấu, game, hệ thống nhúng và phần mềm hiệu suất cao.</p>
                  <p>Hãy tưởng tượng C++ như một chiếc máy tính cực kỳ nhanh — nó nói chuyện <em>gần như trực tiếp</em> với phần cứng, vì vậy chương trình chạy rất nhanh.</p>
                `,
                code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    // In ra màn hình
    cout << "Xin chào, C++!" << endl;
    
    // Nhập một số
    int n;
    cin >> n;
    cout << "Bạn nhập: " << n << endl;
    
    return 0;
}`,
                testcases: [
                  { input: '42', expected: 'Xin chào, C++!\nBạn nhập: 42' },
                  { input: '0', expected: 'Xin chào, C++!\nBạn nhập: 0' },
                ],
                misconceptions: [
                  { wrong: 'Quên return 0', right: 'Luôn có return 0 trong main()' },
                  { wrong: 'printf/scanf kiểu C', right: 'Dùng cout/cin hoặc printf đều được, nhưng KHÔNG mix' },
                ],
                quiz: [
                  {
                    q: '#include <bits/stdc++.h> có tác dụng gì?',
                    opts: ['Chỉ include iostream', 'Include tất cả thư viện chuẩn C++', 'Khai báo namespace std', 'Không có tác dụng'],
                    correct: 1,
                    explain: 'bits/stdc++.h là file header "magic" include toàn bộ thư viện chuẩn. Dùng trong thi lập trình để tiết kiệm thời gian.'
                  }
                ]
              }
            },
            {
              id: 'datatypes',
              title: 'Kiểu dữ liệu & Biến',
              time: '25 phút',
              tags: ['Cơ bản'],
              content: {
                explain: `
                  <p>Biến là "hộp chứa" giá trị. Kiểu dữ liệu xác định hộp đó chứa được gì.</p>
                `,
                code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    // Số nguyên — lưu số không có phần thập phân
    int a = 1000000;            // [-2^31, 2^31-1] ≈ ±2 tỷ
    long long b = 1e18;         // [-2^63, 2^63-1] ≈ ±9.2 × 10^18
    
    // Số thực — lưu số có phần thập phân
    double pi = 3.14159265358979;
    long double pi2 = 3.14159265358979L; // độ chính xác cao hơn
    
    // Ký tự và chuỗi
    char c = 'A';               // Một ký tự ASCII
    string s = "Xin chào";     // Chuỗi ký tự
    
    // Boolean
    bool flag = true;           // true / false
    
    // In kích thước (bytes)
    cout << "int: "         << sizeof(int)         << " bytes\n";
    cout << "long long: "   << sizeof(long long)   << " bytes\n";
    cout << "double: "      << sizeof(double)      << " bytes\n";
    
    return 0;
}`,
                table: {
                  headers: ['Kiểu', 'Kích thước', 'Phạm vi', 'Dùng khi'],
                  rows: [
                    ['int', '4 bytes', '~±2 tỷ', 'N ≤ 2×10⁹'],
                    ['long long', '8 bytes', '~±9.2×10¹⁸', 'N > 2×10⁹'],
                    ['double', '8 bytes', '~15-16 chữ số', 'Số thực'],
                    ['char', '1 byte', '0-255', 'Ký tự đơn'],
                    ['bool', '1 byte', 'true/false', 'Điều kiện'],
                    ['string', 'động', 'không giới hạn', 'Chuỗi ký tự'],
                  ]
                },
                testcases: [
                  { input: '', expected: 'int: 4 bytes\nlong long: 8 bytes\ndouble: 8 bytes' }
                ],
                quiz: [
                  {
                    q: 'N = 10^18. Nên dùng kiểu dữ liệu nào?',
                    opts: ['int', 'long long', 'double', 'float'],
                    correct: 1,
                    explain: 'int chỉ chứa đến ~2×10⁹. Với N = 10¹⁸ cần dùng long long (chứa đến ~9.2×10¹⁸).'
                  }
                ]
              }
            },
            {
              id: 'operators',
              title: 'Toán tử & Biểu thức',
              time: '20 phút',
              tags: ['Cơ bản'],
              content: {
                code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int a = 17, b = 5;
    
    // Toán tử số học
    cout << a + b << "\n";   // 22
    cout << a - b << "\n";   // 12
    cout << a * b << "\n";   // 85
    cout << a / b << "\n";   // 3  (chia nguyên!)
    cout << a % b << "\n";   // 2  (phần dư)
    
    // CẢNH BÁO: Tràn số!
    int x = 2e9;
    // int bad = x * 2;      // OVERFLOW! Kết quả sai
    long long ok = (long long)x * 2;  // Đúng: cast trước khi nhân
    
    // Toán tử bit (quan trọng trong thi đấu!)
    cout << (6 & 3)  << "\n"; // 2   (AND)
    cout << (6 | 3)  << "\n"; // 7   (OR)
    cout << (6 ^ 3)  << "\n"; // 5   (XOR)
    cout << (6 << 1) << "\n"; // 12  (dịch trái = nhân 2)
    cout << (6 >> 1) << "\n"; // 3   (dịch phải = chia 2)
    
    return 0;
}`,
                callout: {
                  type: 'warning',
                  title: '⚠️ Lỗi phổ biến: Tràn số (Overflow)',
                  body: 'Khi nhân 2 số int lớn, kết quả có thể vượt 2^31-1 và bị tràn. Luôn cast sang long long trước khi nhân: <code>(long long)a * b</code>'
                }
              }
            },
            {
              id: 'conditions',
              title: 'Câu lệnh điều kiện',
              time: '20 phút',
              tags: ['Cơ bản'],
              content: {
                code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int diem;
    cin >> diem;
    
    // if - else if - else
    if (diem >= 90)
        cout << "Xuất sắc\n";
    else if (diem >= 75)
        cout << "Giỏi\n";
    else if (diem >= 60)
        cout << "Khá\n";
    else
        cout << "Cần cố gắng\n";
    
    // Toán tử ba ngôi (ternary)
    string ket_qua = (diem >= 50) ? "Đạt" : "Trượt";
    cout << ket_qua << "\n";
    
    // switch-case
    int ngay;
    cin >> ngay;
    switch (ngay) {
        case 2: cout << "Thứ Hai\n"; break;
        case 3: cout << "Thứ Ba\n"; break;
        // ...
        case 8: cout << "Chủ Nhật\n"; break;
        default: cout << "Không hợp lệ\n";
    }
    
    return 0;
}`,
                testcases: [
                  { input: '95\n2', expected: 'Xuất sắc\nĐạt\nThứ Hai' },
                  { input: '45\n8', expected: 'Cần cố gắng\nTrượt\nChủ Nhật' },
                ]
              }
            },
            {
              id: 'loops',
              title: 'Vòng lặp (for, while, do-while)',
              time: '30 phút',
              tags: ['Cơ bản'],
              content: {
                code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    // for — khi biết số lần lặp
    for (int i = 1; i <= 5; i++) {
        cout << i << " ";
    }
    cout << "\n"; // 1 2 3 4 5
    
    // while — khi không biết số lần lặp
    int n = 100, dem = 0;
    while (n > 1) {
        if (n % 2 == 0) n /= 2;
        else n = 3*n + 1;
        dem++;
    }
    cout << "Số bước Collatz: " << dem << "\n";
    
    // Range-based for (C++11) — duyệt mảng/vector
    vector<int> v = {3, 1, 4, 1, 5, 9};
    for (int x : v) cout << x << " ";
    cout << "\n";
    
    // break / continue
    for (int i = 0; i < 10; i++) {
        if (i == 3) continue; // bỏ qua i=3
        if (i == 7) break;    // dừng khi i=7
        cout << i << " ";
    }
    // Output: 0 1 2 4 5 6
    
    return 0;
}`,
                testcases: [
                  { input: '', expected: '1 2 3 4 5 \nSố bước Collatz: 25\n3 1 4 1 5 9 \n0 1 2 4 5 6 ' }
                ]
              }
            },
            {
              id: 'functions',
              title: 'Hàm (Functions)',
              time: '35 phút',
              tags: ['Quan trọng'],
              content: {
                explain: `<p>Hàm = máy biến đầu vào thành đầu ra. Chia nhỏ chương trình, tái sử dụng code, dễ debug hơn.</p>`,
                code: `#include <bits/stdc++.h>
using namespace std;

// Hàm tính ƯCLN (Euclid) — O(log min(a,b))
int ucln(int a, int b) {
    if (b == 0) return a;
    return ucln(b, a % b);
}

// Hàm tính BCNN
long long bcnn(long long a, long long b) {
    return a / ucln(a, b) * b;  // Chia trước để tránh tràn
}

// Truyền tham chiếu (pass by reference)
void swap_vals(int &x, int &y) {
    int tmp = x;
    x = y;
    y = tmp;
}

// Hàm trả về nhiều giá trị qua pair
pair<int,int> chia_co_du(int a, int b) {
    return {a / b, a % b};
}

int main() {
    cout << ucln(48, 18) << "\n";   // 6
    cout << bcnn(12, 18) << "\n";   // 36
    
    int a = 5, b = 3;
    swap_vals(a, b);
    cout << a << " " << b << "\n";  // 3 5
    
    auto [thuong, du] = chia_co_du(17, 5);
    cout << thuong << " du " << du << "\n"; // 3 du 2
    
    return 0;
}`,
              }
            },
          ]
        },
        {
          id: 'arrays-strings',
          title: 'Mảng & Chuỗi',
          lessons: [
            {
              id: 'arrays',
              title: 'Mảng (Array) 1D & 2D',
              time: '40 phút',
              tags: ['Quan trọng'],
              content: {
                code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // Mảng tĩnh — kích thước cố định, khai báo ngoài main nếu lớn
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    
    // Các thao tác cơ bản
    cout << *max_element(a.begin(), a.end()) << "\n"; // Tìm max
    cout << *min_element(a.begin(), a.end()) << "\n"; // Tìm min
    
    sort(a.begin(), a.end()); // Sắp xếp O(n log n)
    
    // Tìm kiếm nhị phân (sau khi sort)
    int target = 5;
    bool found = binary_search(a.begin(), a.end(), target);
    
    // Mảng 2D
    int rows = 3, cols = 4;
    vector<vector<int>> mat(rows, vector<int>(cols, 0));
    
    // Duyệt mảng 2D
    for (int i = 0; i < rows; i++)
        for (int j = 0; j < cols; j++)
            mat[i][j] = i * cols + j;
    
    return 0;
}`,
                callout: {
                  type: 'info',
                  title: '💡 Mảng tĩnh vs Vector',
                  body: 'Dùng <code>vector</code> khi kích thước không biết trước. Dùng mảng tĩnh <code>int a[MAXN]</code> khi tốc độ tới hạn (nhanh hơn ~5-10%).'
                }
              }
            },
            {
              id: 'strings',
              title: 'Chuỗi (String)',
              time: '35 phút',
              tags: ['Thực hành'],
              content: {
                code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    string s = "Hello, C++!";
    
    // Thuộc tính cơ bản
    cout << s.length() << "\n";      // 11
    cout << s[0] << "\n";            // 'H'
    cout << s.substr(7, 3) << "\n";  // "C++"
    
    // Tìm kiếm
    int pos = s.find("C++");
    cout << pos << "\n";  // 7 (-1 nếu không tìm thấy)
    
    // Chuyển đổi
    string num_str = "42";
    int num = stoi(num_str);   // string -> int
    string back = to_string(num * 2); // int -> string
    
    // Duyệt từng ký tự
    for (char c : s) {
        if (isupper(c)) cout << (char)tolower(c);
        else cout << c;
    }
    cout << "\n";
    
    // Đọc cả dòng (có khoảng trắng)
    string line;
    getline(cin, line);
    
    return 0;
}`,
              }
            },
          ]
        },
        {
          id: 'pointers-memory',
          title: 'Con trỏ & Bộ nhớ động',
          lessons: [
            {
              id: 'pointers',
              title: 'Con trỏ (Pointer)',
              time: '45 phút',
              tags: ['Khó', 'Quan trọng'],
              content: {
                explain: `<p>Con trỏ là biến chứa <strong>địa chỉ bộ nhớ</strong> của biến khác. Giống như địa chỉ nhà — bạn có thể đến đó và thay đổi nội dung.</p>`,
                code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int x = 42;
    int* ptr = &x;   // ptr trỏ đến x
    
    cout << x << "\n";    // 42 — giá trị
    cout << &x << "\n";   // địa chỉ của x
    cout << ptr << "\n";  // địa chỉ (= &x)
    cout << *ptr << "\n"; // 42 — dereference
    
    *ptr = 100;           // Thay đổi x qua con trỏ
    cout << x << "\n";   // 100
    
    // Con trỏ và mảng
    int arr[] = {10, 20, 30};
    int* p = arr;         // p trỏ đến arr[0]
    cout << *(p+1) << "\n"; // 20 = arr[1]
    
    // Cấp phát động
    int* heap_arr = new int[5];
    for (int i = 0; i < 5; i++) heap_arr[i] = i * i;
    delete[] heap_arr;    // PHẢI giải phóng!
    
    return 0;
}`,
                callout: {
                  type: 'danger',
                  title: '🚨 Lỗi nguy hiểm: Memory Leak',
                  body: 'Mọi <code>new</code> phải đi kèm <code>delete</code>. Trong thi đấu, dùng vector thay vì cấp phát thủ công để tránh lỗi này.'
                }
              }
            },
          ]
        },
        {
          id: 'oop',
          title: 'OOP — Struct & Class',
          lessons: [
            {
              id: 'struct',
              title: 'Struct — Nhóm dữ liệu',
              time: '30 phút',
              tags: ['Thực hành'],
              content: {
                code: `#include <bits/stdc++.h>
using namespace std;

// Struct — nhóm các trường dữ liệu liên quan
struct SinhVien {
    string ten;
    int tuoi;
    double diem;
    
    // Hàm trong struct
    void in() {
        cout << ten << " - " << tuoi << " tuổi - " << diem << " điểm\n";
    }
};

// Struct có thể so sánh (dùng trong sort, priority_queue)
struct Canh {
    int u, v, w;
    bool operator<(const Canh& other) const {
        return w < other.w; // Sắp xếp theo trọng số tăng dần
    }
};

int main() {
    SinhVien sv = {"Nguyễn An", 18, 9.5};
    sv.in();
    
    vector<SinhVien> ds;
    ds.push_back({"Trần Bình", 19, 8.2});
    ds.push_back({"Lê Chi", 18, 9.1});
    
    // Sort theo điểm giảm dần
    sort(ds.begin(), ds.end(), [](const SinhVien& a, const SinhVien& b){
        return a.diem > b.diem;
    });
    
    for (auto& sv : ds) sv.in();
    
    return 0;
}`,
              }
            },
            {
              id: 'class-oop',
              title: 'Class & Lập trình hướng đối tượng',
              time: '50 phút',
              tags: ['OOP'],
              content: {
                code: `#include <bits/stdc++.h>
using namespace std;

class Stack {
private:
    vector<int> data;

public:
    // Constructor
    Stack() {}
    
    void push(int x) { data.push_back(x); }
    
    void pop() {
        if (empty()) throw runtime_error("Stack rỗng!");
        data.pop_back();
    }
    
    int top() {
        if (empty()) throw runtime_error("Stack rỗng!");
        return data.back();
    }
    
    bool empty() { return data.empty(); }
    int size() { return data.size(); }
};

// Kế thừa (Inheritance)
class MinStack : public Stack {
    stack<int> min_stk;
public:
    void push(int x) {
        Stack::push(x);
        if (min_stk.empty() || x <= min_stk.top())
            min_stk.push(x);
    }
    int getMin() { return min_stk.top(); }
};

int main() {
    Stack s;
    s.push(3); s.push(1); s.push(4);
    cout << s.top() << "\n";   // 4
    s.pop();
    cout << s.top() << "\n";   // 1
    
    MinStack ms;
    ms.push(5); ms.push(3); ms.push(7);
    cout << ms.getMin() << "\n"; // 3
    
    return 0;
}`,
              }
            }
          ]
        }
      ]
    },
    {
      id: 'phase2',
      title: 'Giai đoạn 2 — STL & Thuật toán cơ bản',
      level: 'intermediate',
      icon: '🟡',
      desc: 'Làm chủ Standard Template Library và các thuật toán nền tảng',
      sections: [
        {
          id: 'stl',
          title: 'STL Container',
          lessons: [
            {
              id: 'vector',
              title: 'Vector — Mảng động',
              time: '30 phút',
              tags: ['STL'],
              content: {
                code: `#include <bits/stdc++.h>
using namespace std;
int main() {
    vector<int> v;
    
    // Thêm / xóa — O(1) amortized
    v.push_back(1);
    v.push_back(2);
    v.push_back(3);
    v.pop_back();
    
    // Truy cập
    cout << v[0] << "\n";      // 1 — không kiểm tra biên
    cout << v.at(1) << "\n";   // 2 — có kiểm tra biên
    cout << v.front() << "\n"; // 1
    cout << v.back() << "\n";  // 2
    
    // Duyệt
    for (int x : v) cout << x << " ";
    
    // Kích thước
    cout << v.size() << "\n";
    v.clear();
    cout << v.empty() << "\n"; // 1
    
    // Khởi tạo với giá trị mặc định
    vector<int> dp(100, 0);    // 100 phần tử, giá trị 0
    
    // 2D vector
    int n = 3, m = 4;
    vector<vector<int>> grid(n, vector<int>(m, -1));
}`,
              }
            },
            {
              id: 'map-set',
              title: 'Map & Set — Tìm kiếm O(log n)',
              time: '40 phút',
              tags: ['STL', 'Quan trọng'],
              content: {
                code: `#include <bits/stdc++.h>
using namespace std;
int main() {
    // MAP — ánh xạ key -> value, sắp xếp theo key
    map<string, int> diem;
    diem["An"] = 9;
    diem["Bình"] = 8;
    diem["Chi"] = 9;
    
    // Tìm kiếm O(log n)
    if (diem.count("An")) cout << diem["An"] << "\n"; // 9
    
    auto it = diem.find("Bình");
    if (it != diem.end()) cout << it->second << "\n";
    
    // Duyệt theo thứ tự key
    for (auto& [ten, d] : diem) cout << ten << ": " << d << "\n";
    
    // SET — tập hợp phần tử không trùng, sắp xếp
    set<int> s = {3, 1, 4, 1, 5, 9, 2, 6};
    // {1, 2, 3, 4, 5, 6, 9} — tự loại trùng, tự sort
    
    s.insert(7);
    s.erase(4);
    cout << s.count(5) << "\n"; // 1 (có) hoặc 0 (không có)
    
    // Tìm phần tử >= x
    auto lb = s.lower_bound(5);
    cout << *lb << "\n"; // 5
    
    // UNORDERED_MAP — O(1) trung bình, không sắp xếp
    unordered_map<int, int> freq;
    vector<int> arr = {1,2,1,3,2,1};
    for (int x : arr) freq[x]++;
    // freq = {1:3, 2:2, 3:1}
}`,
                table: {
                  headers: ['Container', 'Insert', 'Find', 'Delete', 'Ordered?'],
                  rows: [
                    ['map', 'O(log n)', 'O(log n)', 'O(log n)', '✅ Có'],
                    ['unordered_map', 'O(1)', 'O(1)', 'O(1)', '❌ Không'],
                    ['set', 'O(log n)', 'O(log n)', 'O(log n)', '✅ Có'],
                    ['unordered_set', 'O(1)', 'O(1)', 'O(1)', '❌ Không'],
                  ]
                }
              }
            },
            {
              id: 'stack-queue',
              title: 'Stack, Queue, Deque, Priority Queue',
              time: '45 phút',
              tags: ['STL', 'Quan trọng'],
              content: {
                code: `#include <bits/stdc++.h>
using namespace std;
int main() {
    // STACK — LIFO (vào sau ra trước)
    stack<int> stk;
    stk.push(1); stk.push(2); stk.push(3);
    cout << stk.top() << "\n"; // 3
    stk.pop();
    
    // QUEUE — FIFO (vào trước ra trước)
    queue<int> q;
    q.push(1); q.push(2); q.push(3);
    cout << q.front() << "\n"; // 1
    q.pop();
    
    // DEQUE — Double-Ended Queue
    deque<int> dq;
    dq.push_front(1); // thêm đầu
    dq.push_back(2);  // thêm cuối
    dq.pop_front();   // xóa đầu
    
    // PRIORITY QUEUE — Max Heap (mặc định)
    priority_queue<int> maxpq;
    maxpq.push(3); maxpq.push(1); maxpq.push(4);
    cout << maxpq.top() << "\n"; // 4 — phần tử lớn nhất
    
    // Min Heap
    priority_queue<int, vector<int>, greater<int>> minpq;
    minpq.push(3); minpq.push(1); minpq.push(4);
    cout << minpq.top() << "\n"; // 1 — phần tử nhỏ nhất
    
    // Priority Queue với custom comparator
    using pii = pair<int,int>;
    priority_queue<pii, vector<pii>, greater<pii>> dijkstra_pq;
    dijkstra_pq.push({10, 0}); // {khoảng cách, đỉnh}
    dijkstra_pq.push({5, 1});
    cout << dijkstra_pq.top().first << "\n"; // 5
}`,
              }
            }
          ]
        },
        {
          id: 'sorting-searching',
          title: 'Sắp xếp & Tìm kiếm',
          lessons: [
            {
              id: 'sorting',
              title: 'Các thuật toán sắp xếp',
              time: '60 phút',
              tags: ['Thuật toán', 'Quan trọng'],
              vizType: 'sort',
              content: {
                code: `#include <bits/stdc++.h>
using namespace std;

// Bubble Sort — O(n²) — chỉ dùng để dạy khái niệm
void bubble_sort(vector<int>& a) {
    int n = a.size();
    for (int i = 0; i < n-1; i++)
        for (int j = 0; j < n-i-1; j++)
            if (a[j] > a[j+1])
                swap(a[j], a[j+1]);
}

// Merge Sort — O(n log n) — ổn định, chia để trị
void merge_sort(vector<int>& a, int l, int r) {
    if (l >= r) return;
    int mid = (l + r) / 2;
    merge_sort(a, l, mid);
    merge_sort(a, mid+1, r);
    
    // Gộp hai nửa đã sort
    vector<int> tmp;
    int i = l, j = mid+1;
    while (i <= mid && j <= r) {
        if (a[i] <= a[j]) tmp.push_back(a[i++]);
        else tmp.push_back(a[j++]);
    }
    while (i <= mid) tmp.push_back(a[i++]);
    while (j <= r) tmp.push_back(a[j++]);
    for (int k = l; k <= r; k++) a[k] = tmp[k-l];
}

int main() {
    vector<int> v = {64, 34, 25, 12, 22, 11, 90};
    
    // Dùng sort của STL — O(n log n), nhanh nhất
    sort(v.begin(), v.end());
    
    // Sort theo tiêu chí tùy chỉnh
    sort(v.begin(), v.end(), greater<int>()); // Giảm dần
    
    // Sort struct
    vector<pair<int,int>> pts = {{3,2},{1,4},{3,1}};
    sort(pts.begin(), pts.end(), [](const pair<int,int>& a, const pair<int,int>& b){
        if (a.first != b.first) return a.first < b.first;
        return a.second < b.second;
    });
}`,
                table: {
                  headers: ['Thuật toán', 'Best', 'Average', 'Worst', 'Ổn định?', 'Dùng khi'],
                  rows: [
                    ['Bubble Sort', 'O(n)', 'O(n²)', 'O(n²)', '✅', 'Học khái niệm'],
                    ['Merge Sort', 'O(n log n)', 'O(n log n)', 'O(n log n)', '✅', 'Cần ổn định'],
                    ['Quick Sort', 'O(n log n)', 'O(n log n)', 'O(n²)', '❌', 'Thực tế nhanh'],
                    ['std::sort', 'O(n)', 'O(n log n)', 'O(n log n)', '❌', 'Thi đấu'],
                    ['Counting Sort', 'O(n+k)', 'O(n+k)', 'O(n+k)', '✅', 'Giá trị nhỏ'],
                  ]
                }
              }
            },
            {
              id: 'binary-search',
              title: 'Tìm kiếm nhị phân (Binary Search)',
              time: '50 phút',
              tags: ['Thuật toán', 'Quan trọng'],
              vizType: 'bsearch',
              content: {
                explain: `<p>Tìm kiếm nhị phân = mỗi lần loại bỏ nửa còn lại. Giống như tìm từ trong từ điển — bạn không đọc từ đầu, mà mở giữa rồi quyết định đi trái hay phải.</p>`,
                code: `#include <bits/stdc++.h>
using namespace std;

// Template Binary Search — tìm phần tử đầu tiên thỏa mãn điều kiện
// Điều kiện phải có dạng: false, false, ..., false, true, true, ..., true
// Hàm trả về vị trí đầu tiên có condition = true
int binary_search_custom(vector<int>& a, int target) {
    int lo = 0, hi = a.size() - 1, ans = -1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2; // Tránh tràn số
        if (a[mid] == target) {
            ans = mid;
            break;
        } else if (a[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return ans;
}

// Binary search trên đáp án — kỹ thuật quan trọng!
// Ví dụ: Tìm căn bậc 2 của n
long long sqrt_integer(long long n) {
    long long lo = 1, hi = 1e9, ans = 0;
    while (lo <= hi) {
        long long mid = (lo + hi) / 2;
        if (mid * mid <= n) {
            ans = mid;
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    return ans;
}

int main() {
    vector<int> a = {1, 3, 5, 7, 9, 11, 13, 15};
    
    // STL binary search
    cout << binary_search(a.begin(), a.end(), 7) << "\n"; // 1
    
    // lower_bound: vị trí đầu tiên >= target
    auto lb = lower_bound(a.begin(), a.end(), 6);
    cout << *lb << "\n"; // 7
    cout << lb - a.begin() << "\n"; // 3 (index)
    
    // upper_bound: vị trí đầu tiên > target
    auto ub = upper_bound(a.begin(), a.end(), 7);
    cout << ub - a.begin() << "\n"; // 4
    
    // Đếm số lần xuất hiện của x trong mảng đã sort
    int x = 7;
    int count = upper_bound(a.begin(), a.end(), x) - lower_bound(a.begin(), a.end(), x);
    
    cout << sqrt_integer(26) << "\n"; // 5 (vì 5² = 25 ≤ 26 < 36 = 6²)
}`,
              }
            },
            {
              id: 'two-pointers',
              title: 'Two Pointers & Sliding Window',
              time: '55 phút',
              tags: ['Kỹ thuật', 'Quan trọng'],
              content: {
                code: `#include <bits/stdc++.h>
using namespace std;

// TWO POINTERS — Tìm cặp có tổng = target trong mảng đã sort
// O(n) thay vì O(n²)
void two_sum(vector<int>& a, int target) {
    int lo = 0, hi = a.size() - 1;
    while (lo < hi) {
        int sum = a[lo] + a[hi];
        if (sum == target) {
            cout << a[lo] << " + " << a[hi] << " = " << target << "\n";
            lo++; hi--;
        } else if (sum < target) lo++;
        else hi--;
    }
}

// SLIDING WINDOW — Tìm subarray dài nhất có tổng <= k
// O(n) thay vì O(n²)
int max_subarray(vector<int>& a, int k) {
    int lo = 0, sum = 0, ans = 0;
    for (int hi = 0; hi < a.size(); hi++) {
        sum += a[hi]; // Mở rộng cửa sổ
        while (sum > k) {
            sum -= a[lo]; // Thu hẹp cửa sổ
            lo++;
        }
        ans = max(ans, hi - lo + 1);
    }
    return ans;
}

// SLIDING WINDOW cố định — Tìm max subarray độ dài k
int max_window_k(vector<int>& a, int k) {
    int sum = 0, ans = INT_MIN;
    for (int i = 0; i < a.size(); i++) {
        sum += a[i];
        if (i >= k) sum -= a[i-k]; // Loại phần tử đi ra
        if (i >= k-1) ans = max(ans, sum);
    }
    return ans;
}

int main() {
    vector<int> a = {1, 2, 3, 4, 5, 6, 7};
    two_sum(a, 9); // 2+7=9, 3+6=9, 4+5=9
    
    vector<int> b = {2, 1, 5, 2, 3, 2};
    cout << max_subarray(b, 7) << "\n"; // 4 ([2,1,5,2] hoặc [1,5,2,3] không -> [2,1,5,2] = 10 > 7)
}`,
              }
            }
          ]
        }
      ]
    },
    {
      id: 'phase3',
      title: 'Giai đoạn 3 — Cây & Đồ thị',
      level: 'advanced',
      icon: '🔴',
      desc: 'DFS, BFS, Dijkstra, Kruskal, cây nhị phân và các thuật toán đồ thị',
      sections: [
        {
          id: 'graph-basics',
          title: 'Đồ thị cơ bản',
          lessons: [
            {
              id: 'graph-represent',
              title: 'Biểu diễn đồ thị',
              time: '30 phút',
              tags: ['Đồ thị'],
              content: {
                code: `#include <bits/stdc++.h>
using namespace std;

// Danh sách kề — cách biểu diễn phổ biến nhất
// O(V + E) bộ nhớ
int n, m;
vector<pair<int,int>> adj[100005]; // adj[u] = {v, w}

void add_edge(int u, int v, int w = 1) {
    adj[u].push_back({v, w});
    adj[v].push_back({u, w}); // Bỏ dòng này nếu đồ thị có hướng
}

int main() {
    cin >> n >> m;
    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        add_edge(u, v, w);
    }
}`,
                table: {
                  headers: ['Biểu diễn', 'Bộ nhớ', 'Kiểm tra cạnh', 'Duyệt hàng xóm', 'Dùng khi'],
                  rows: [
                    ['Ma trận kề', 'O(V²)', 'O(1)', 'O(V)', 'V nhỏ (≤1000)'],
                    ['Danh sách kề', 'O(V+E)', 'O(deg)', 'O(deg)', 'Hầu hết bài'],
                    ['Danh sách cạnh', 'O(E)', 'O(E)', 'O(E)', 'Kruskal, sort cạnh'],
                  ]
                }
              }
            },
            {
              id: 'dfs-bfs',
              title: 'DFS & BFS',
              time: '60 phút',
              tags: ['Đồ thị', 'Quan trọng'],
              vizType: 'graph',
              content: {
                explain: `<p><strong>DFS</strong> (Depth-First Search): Đi sâu hết mức có thể rồi quay lui. Như đi mê cung — cứ đi thẳng đến khi gặp tường mới quay lại.</p>
                <p><strong>BFS</strong> (Breadth-First Search): Khám phá theo từng lớp. Như lan rộng sóng nước từ một điểm.</p>`,
                code: `#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;
vector<int> adj[MAXN];
bool visited[MAXN];

// DFS — Tìm kiếm theo chiều sâu
void dfs(int u) {
    visited[u] = true;
    cout << u << " ";
    for (int v : adj[u]) {
        if (!visited[v]) {
            dfs(v);
        }
    }
}

// DFS lặp (không đệ quy, tránh stack overflow)
void dfs_iterative(int start) {
    stack<int> stk;
    stk.push(start);
    while (!stk.empty()) {
        int u = stk.top(); stk.pop();
        if (visited[u]) continue;
        visited[u] = true;
        cout << u << " ";
        for (int v : adj[u])
            if (!visited[v]) stk.push(v);
    }
}

// BFS — Tìm đường ngắn nhất (đồ thị không trọng số)
vector<int> bfs_distance(int start, int n) {
    vector<int> dist(n+1, -1);
    queue<int> q;
    q.push(start);
    dist[start] = 0;
    
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
    return dist;
}

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < m; i++) {
        int u, v; cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    
    // Đếm số thành phần liên thông
    int components = 0;
    for (int i = 1; i <= n; i++) {
        if (!visited[i]) {
            dfs(i);
            components++;
            cout << "\n";
        }
    }
    cout << "Số TPLT: " << components << "\n";
}`,
                testcases: [
                  { input: '5 4\n1 2\n2 3\n4 5\n1 3', expected: '1 2 3 \n4 5 \nSố TPLT: 2' },
                ]
              }
            },
            {
              id: 'dijkstra',
              title: 'Dijkstra — Đường đi ngắn nhất',
              time: '70 phút',
              tags: ['Đồ thị', 'Quan trọng', 'Nâng cao'],
              vizType: 'dijkstra',
              content: {
                explain: `<p>Dijkstra tìm đường đi ngắn nhất từ một đỉnh đến tất cả đỉnh còn lại. Hoạt động bằng cách luôn xử lý đỉnh gần nhất trước (tham lam).</p>
                <p><strong>Điều kiện</strong>: Trọng số cạnh phải không âm. Nếu có cạnh âm, dùng Bellman-Ford.</p>`,
                code: `#include <bits/stdc++.h>
using namespace std;

const int INF = 1e9;
const int MAXN = 100005;
vector<pair<int,int>> adj[MAXN]; // {v, w}

vector<int> dijkstra(int start, int n) {
    vector<int> dist(n+1, INF);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    
    dist[start] = 0;
    pq.push({0, start}); // {khoảng cách, đỉnh}
    
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        
        // Bỏ qua nếu đã tìm thấy đường ngắn hơn
        if (d > dist[u]) continue;
        
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        adj[u].push_back({v, w});
        adj[v].push_back({u, w});
    }
    
    auto dist = dijkstra(1, n);
    for (int i = 1; i <= n; i++) {
        if (dist[i] == INF) cout << -1;
        else cout << dist[i];
        cout << "\n";
    }
}`,
                testcases: [
                  { input: '4 5\n1 2 1\n1 3 4\n2 3 2\n2 4 5\n3 4 1', expected: '0\n1\n3\n4' }
                ]
              }
            },
          ]
        },
        {
          id: 'advanced-ds',
          title: 'Cấu trúc dữ liệu nâng cao',
          lessons: [
            {
              id: 'dsu',
              title: 'DSU — Disjoint Set Union',
              time: '60 phút',
              tags: ['Cấu trúc dữ liệu', 'Quan trọng'],
              vizType: 'dsu',
              content: {
                explain: `<p>DSU (Union-Find) quản lý các tập hợp rời nhau. Cho phép kiểm tra 2 phần tử có cùng tập không, và gộp 2 tập thành 1 — trong gần như O(1).</p>`,
                code: `#include <bits/stdc++.h>
using namespace std;

struct DSU {
    vector<int> parent, rank_;
    int components;
    
    DSU(int n) : parent(n+1), rank_(n+1, 0), components(n) {
        iota(parent.begin(), parent.end(), 0); // parent[i] = i
    }
    
    // Tìm đại diện của tập chứa x (Path Compression)
    int find(int x) {
        if (parent[x] != x)
            parent[x] = find(parent[x]); // Nén đường đi
        return parent[x];
    }
    
    // Gộp tập chứa x và tập chứa y (Union by Rank)
    bool unite(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return false; // Đã cùng tập
        
        if (rank_[px] < rank_[py]) swap(px, py);
        parent[py] = px; // py gộp vào px
        if (rank_[px] == rank_[py]) rank_[px]++;
        components--;
        return true;
    }
    
    bool same(int x, int y) { return find(x) == find(y); }
};

// Ứng dụng: Kruskal MST
struct Edge { int u, v, w; };

int kruskal(int n, vector<Edge>& edges) {
    sort(edges.begin(), edges.end(), [](const Edge& a, const Edge& b){
        return a.w < b.w;
    });
    
    DSU dsu(n);
    int total = 0, count = 0;
    
    for (auto& e : edges) {
        if (dsu.unite(e.u, e.v)) {
            total += e.w;
            count++;
            if (count == n-1) break; // MST có đúng n-1 cạnh
        }
    }
    return (count == n-1) ? total : -1; // -1 nếu không liên thông
}

int main() {
    int n, m;
    cin >> n >> m;
    vector<Edge> edges(m);
    for (auto& e : edges) cin >> e.u >> e.v >> e.w;
    
    cout << kruskal(n, edges) << "\n";
}`,
              }
            },
            {
              id: 'segment-tree',
              title: 'Segment Tree — Cây Phân Đoạn',
              time: '90 phút',
              tags: ['Cấu trúc dữ liệu', 'Nâng cao'],
              vizType: 'segtree',
              content: {
                explain: `<p>Segment Tree chia mảng thành các đoạn theo kiểu "chia đôi", cho phép truy vấn (tổng, max, min...) và cập nhật bất kỳ đoạn nào trong O(log n).</p>`,
                code: `#include <bits/stdc++.h>
using namespace std;

struct SegmentTree {
    int n;
    vector<long long> tree;
    
    SegmentTree(int n) : n(n), tree(4*n, 0) {}
    
    void build(vector<int>& a, int node, int lo, int hi) {
        if (lo == hi) { tree[node] = a[lo]; return; }
        int mid = (lo + hi) / 2;
        build(a, 2*node, lo, mid);
        build(a, 2*node+1, mid+1, hi);
        tree[node] = tree[2*node] + tree[2*node+1]; // Hàm merge
    }
    
    void update(int node, int lo, int hi, int pos, int val) {
        if (lo == hi) { tree[node] = val; return; }
        int mid = (lo + hi) / 2;
        if (pos <= mid) update(2*node, lo, mid, pos, val);
        else update(2*node+1, mid+1, hi, pos, val);
        tree[node] = tree[2*node] + tree[2*node+1];
    }
    
    long long query(int node, int lo, int hi, int l, int r) {
        if (r < lo || hi < l) return 0; // Ngoài đoạn
        if (l <= lo && hi <= r) return tree[node]; // Hoàn toàn trong đoạn
        int mid = (lo + hi) / 2;
        return query(2*node, lo, mid, l, r) + 
               query(2*node+1, mid+1, hi, l, r);
    }
    
    void update(int pos, int val) { update(1, 1, n, pos, val); }
    long long query(int l, int r) { return query(1, 1, n, l, r); }
    void build(vector<int>& a) { build(a, 1, 1, n); }
};

int main() {
    int n, q;
    cin >> n >> q;
    vector<int> a(n+1);
    for (int i = 1; i <= n; i++) cin >> a[i];
    
    SegmentTree seg(n);
    seg.build(a);
    
    while (q--) {
        int type; cin >> type;
        if (type == 1) {
            int pos, val; cin >> pos >> val;
            seg.update(pos, val);
        } else {
            int l, r; cin >> l >> r;
            cout << seg.query(l, r) << "\n";
        }
    }
}`,
                testcases: [
                  { input: '5 5\n1 2 3 4 5\n2 1 5\n1 3 10\n2 1 5\n2 2 4\n1 5 1', expected: '15\n22\n16' }
                ]
              }
            },
            {
              id: 'fenwick',
              title: 'Fenwick Tree (BIT)',
              time: '60 phút',
              tags: ['Cấu trúc dữ liệu', 'Nâng cao'],
              content: {
                explain: `<p>Fenwick Tree (Binary Indexed Tree) = Segment Tree đơn giản hơn, chỉ cần mảng 1D. Cài đặt 5 dòng, hiểu được nhờ bit thao tác thông minh.</p>`,
                code: `#include <bits/stdc++.h>
using namespace std;

struct BIT {
    int n;
    vector<long long> tree;
    
    BIT(int n) : n(n), tree(n+1, 0) {}
    
    // Cộng val vào vị trí pos
    void update(int pos, long long val) {
        for (; pos <= n; pos += pos & (-pos)) // Bí quyết: pos & (-pos)
            tree[pos] += val;
    }
    
    // Tổng từ 1 đến pos
    long long query(int pos) {
        long long sum = 0;
        for (; pos > 0; pos -= pos & (-pos))
            sum += tree[pos];
        return sum;
    }
    
    // Tổng từ l đến r
    long long query(int l, int r) {
        return query(r) - query(l-1);
    }
};

int main() {
    int n; cin >> n;
    BIT bit(n);
    
    for (int i = 1; i <= n; i++) {
        int x; cin >> x;
        bit.update(i, x);
    }
    
    int q; cin >> q;
    while (q--) {
        int type; cin >> type;
        if (type == 1) {
            int pos, val; cin >> pos >> val;
            bit.update(pos, val);
        } else {
            int l, r; cin >> l >> r;
            cout << bit.query(l, r) << "\n";
        }
    }
}`,
              }
            }
          ]
        }
      ]
    },
    {
      id: 'phase4',
      title: 'Giai đoạn 4 — Quy hoạch động',
      level: 'advanced',
      icon: '🔴',
      desc: 'DP từ nhập môn đến bitmask, cây, chữ số, và DP tối ưu',
      sections: [
        {
          id: 'dp-basics',
          title: 'Quy hoạch động cơ bản',
          lessons: [
            {
              id: 'dp-intro',
              title: 'Giới thiệu DP — Đệ quy + Ghi nhớ',
              time: '60 phút',
              tags: ['DP', 'Quan trọng'],
              content: {
                explain: `<p>DP = Chia bài toán lớn thành bài toán nhỏ hơn, lưu kết quả để không tính lại. Chìa khóa: tìm công thức truy hồi đúng.</p>
                <p><strong>Bước 1</strong>: Định nghĩa trạng thái dp[...] nghĩa là gì<br>
                <strong>Bước 2</strong>: Tìm công thức chuyển trạng thái<br>
                <strong>Bước 3</strong>: Xác định base case<br>
                <strong>Bước 4</strong>: Xác định thứ tự tính</p>`,
                code: `#include <bits/stdc++.h>
using namespace std;

// Fibonacci — Ví dụ đơn giản nhất về DP
// dp[i] = số Fibonacci thứ i
// dp[i] = dp[i-1] + dp[i-2]
// dp[0]=0, dp[1]=1

// Cách 1: Đệ quy có ghi nhớ (Top-down)
map<int, long long> memo;
long long fib_memo(int n) {
    if (n <= 1) return n;
    if (memo.count(n)) return memo[n];
    return memo[n] = fib_memo(n-1) + fib_memo(n-2);
}

// Cách 2: Bottom-up (Tabulation) — Nhanh hơn
long long fib_dp(int n) {
    if (n <= 1) return n;
    vector<long long> dp(n+1);
    dp[0] = 0; dp[1] = 1;
    for (int i = 2; i <= n; i++)
        dp[i] = dp[i-1] + dp[i-2];
    return dp[n];
}

// Cách 3: O(1) bộ nhớ (chỉ cần 2 biến trước)
long long fib_opt(int n) {
    if (n <= 1) return n;
    long long a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        long long c = a + b;
        a = b; b = c;
    }
    return b;
}

// DP cổ điển: Bài toán Knapsack 0/1
// dp[i][j] = giá trị max khi dùng i đồ đầu tiên, tải trọng j
int knapsack(vector<int>& w, vector<int>& v, int W) {
    int n = w.size();
    vector<vector<int>> dp(n+1, vector<int>(W+1, 0));
    
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j <= W; j++) {
            dp[i][j] = dp[i-1][j]; // Không lấy đồ i
            if (j >= w[i-1]) // Có thể lấy đồ i
                dp[i][j] = max(dp[i][j], dp[i-1][j-w[i-1]] + v[i-1]);
        }
    }
    return dp[n][W];
}

int main() {
    for (int i = 0; i <= 10; i++)
        cout << fib_opt(i) << " ";
    cout << "\n";
    
    vector<int> w = {2, 3, 4, 5}, v = {3, 4, 5, 6};
    cout << knapsack(w, v, 8) << "\n"; // 10
}`,
              }
            },
            {
              id: 'dp-lis',
              title: 'LIS — Dãy tăng dài nhất',
              time: '60 phút',
              tags: ['DP', 'Cổ điển'],
              content: {
                code: `#include <bits/stdc++.h>
using namespace std;

// LIS — Longest Increasing Subsequence
// dp[i] = độ dài LIS kết thúc tại a[i]
// dp[i] = 1 + max(dp[j]) với j < i và a[j] < a[i]
// O(n²) — đủ với n ≤ 5000

int lis_n2(vector<int>& a) {
    int n = a.size();
    vector<int> dp(n, 1);
    int ans = 1;
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (a[j] < a[i])
                dp[i] = max(dp[i], dp[j] + 1);
        }
        ans = max(ans, dp[i]);
    }
    return ans;
}

// LIS O(n log n) — Dùng binary search + mảng "tails"
// tails[i] = phần tử nhỏ nhất kết thúc LIS độ dài i+1
int lis_nlogn(vector<int>& a) {
    vector<int> tails;
    for (int x : a) {
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) tails.push_back(x);
        else *it = x;
    }
    return tails.size();
}

// In ra dãy LIS thực tế
vector<int> lis_reconstruct(vector<int>& a) {
    int n = a.size();
    vector<int> dp(n, 1), prev_idx(n, -1);
    
    for (int i = 1; i < n; i++)
        for (int j = 0; j < i; j++)
            if (a[j] < a[i] && dp[j]+1 > dp[i]) {
                dp[i] = dp[j] + 1;
                prev_idx[i] = j;
            }
    
    int end = max_element(dp.begin(), dp.end()) - dp.begin();
    vector<int> lis;
    for (int i = end; i != -1; i = prev_idx[i])
        lis.push_back(a[i]);
    reverse(lis.begin(), lis.end());
    return lis;
}

int main() {
    vector<int> a = {3, 1, 8, 2, 5, 4, 7, 6};
    cout << lis_nlogn(a) << "\n"; // 4 (1,2,4,6 hoặc 1,2,4,7)
    
    auto lis = lis_reconstruct(a);
    for (int x : lis) cout << x << " "; // 1 2 5 7
}`,
              }
            },
            {
              id: 'dp-bitmask',
              title: 'Bitmask DP',
              time: '80 phút',
              tags: ['DP', 'Nâng cao', 'Bitmask'],
              content: {
                explain: `<p>Bitmask DP dùng khi cần lưu "tập con nào đã được chọn". Mỗi bit trong số nguyên đại diện cho một phần tử có trong tập hay không.</p>`,
                code: `#include <bits/stdc++.h>
using namespace std;

// Bài toán: Travelling Salesman Problem (TSP)
// dp[mask][i] = chi phí ngắn nhất khi đã thăm tập đỉnh "mask"
//               và đang ở đỉnh i
// O(2^n * n²)

int tsp(vector<vector<int>>& dist) {
    int n = dist.size();
    int FULL = (1 << n) - 1; // Tất cả đỉnh đã thăm
    
    // dp[mask][i] = min cost thăm đúng các đỉnh trong mask, kết ở i
    vector<vector<int>> dp(1 << n, vector<int>(n, 1e9));
    dp[1][0] = 0; // Bắt đầu từ đỉnh 0
    
    for (int mask = 1; mask < (1 << n); mask++) {
        for (int u = 0; u < n; u++) {
            if (!(mask >> u & 1)) continue; // u không trong mask
            if (dp[mask][u] == 1e9) continue;
            
            for (int v = 0; v < n; v++) {
                if (mask >> v & 1) continue; // v đã thăm
                int new_mask = mask | (1 << v);
                dp[new_mask][v] = min(dp[new_mask][v], 
                                      dp[mask][u] + dist[u][v]);
            }
        }
    }
    
    // Quay về đỉnh 0
    int ans = 1e9;
    for (int u = 1; u < n; u++)
        ans = min(ans, dp[FULL][u] + dist[u][0]);
    return ans;
}

// Bài toán: Số lượng tập con có XOR = 0
void count_xor_subsets(vector<int>& a) {
    int n = a.size();
    for (int mask = 0; mask < (1 << n); mask++) {
        int xor_val = 0;
        for (int i = 0; i < n; i++)
            if (mask >> i & 1) xor_val ^= a[i];
        if (xor_val == 0) cout << "mask=" << mask << "\n";
    }
}

int main() {
    vector<vector<int>> dist = {
        {0, 10, 15, 20},
        {10, 0, 35, 25},
        {15, 35, 0, 30},
        {20, 25, 30, 0}
    };
    cout << tsp(dist) << "\n"; // 80
}`,
              }
            }
          ]
        }
      ]
    },
    {
      id: 'phase5',
      title: 'Giai đoạn 5 — Thuật toán nâng cao',
      level: 'advanced',
      icon: '⚡',
      desc: 'Đệ quy, Chia để trị, Số học, Chuỗi, Hình học',
      sections: [
        {
          id: 'math',
          title: 'Số học & Lý thuyết số',
          lessons: [
            {
              id: 'primes',
              title: 'Số nguyên tố & Sàng Eratosthenes',
              time: '50 phút',
              tags: ['Số học', 'Quan trọng'],
              content: {
                code: `#include <bits/stdc++.h>
using namespace std;

// Kiểm tra số nguyên tố — O(sqrt(n))
bool is_prime(long long n) {
    if (n < 2) return false;
    for (long long i = 2; i * i <= n; i++)
        if (n % i == 0) return false;
    return true;
}

// Sàng Eratosthenes — O(n log log n)
// is_prime[i] = true nếu i là số nguyên tố
vector<bool> sieve(int n) {
    vector<bool> primes(n+1, true);
    primes[0] = primes[1] = false;
    for (int i = 2; i * i <= n; i++) {
        if (primes[i]) {
            for (int j = i*i; j <= n; j += i)
                primes[j] = false;
        }
    }
    return primes;
}

// Sàng tuyến tính — O(n), sinh danh sách số nguyên tố
vector<int> linear_sieve(int n) {
    vector<int> primes, spf(n+1, 0); // spf = smallest prime factor
    for (int i = 2; i <= n; i++) {
        if (spf[i] == 0) { // i là số nguyên tố
            spf[i] = i;
            primes.push_back(i);
        }
        for (int p : primes) {
            if (p > spf[i] || (long long)i*p > n) break;
            spf[i*p] = p;
        }
    }
    return primes;
}

// Phân tích thừa số nguyên tố — O(sqrt(n))
map<int,int> factorize(int n) {
    map<int,int> factors;
    for (int p = 2; p*p <= n; p++) {
        while (n % p == 0) {
            factors[p]++;
            n /= p;
        }
    }
    if (n > 1) factors[n]++;
    return factors;
}

// Phi Euler — O(sqrt(n))
int euler_phi(int n) {
    int result = n;
    for (int p = 2; p*p <= n; p++) {
        if (n % p == 0) {
            while (n % p == 0) n /= p;
            result -= result / p;
        }
    }
    if (n > 1) result -= result / n;
    return result;
}

int main() {
    // Sàng đến 10^6
    auto primes = sieve(1000000);
    int count = 0;
    for (int i = 2; i <= 1000000; i++) if (primes[i]) count++;
    cout << "Số nguyên tố đến 10^6: " << count << "\n"; // 78498
    
    auto factors = factorize(360);
    for (auto [p, e] : factors)
        cout << p << "^" << e << " ";
    // 2^3 3^2 5^1
}`,
              }
            },
            {
              id: 'modular',
              title: 'Số học Modulo & Nghịch đảo',
              time: '60 phút',
              tags: ['Số học', 'Nâng cao'],
              content: {
                code: `#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1e9 + 7;

// Lũy thừa nhanh — a^b mod m trong O(log b)
long long power(long long a, long long b, long long mod) {
    long long result = 1;
    a %= mod;
    while (b > 0) {
        if (b & 1) result = result * a % mod; // bit cuối = 1
        a = a * a % mod; // Nhân đôi số mũ
        b >>= 1;
    }
    return result;
}

// Nghịch đảo modulo (cần MOD là số nguyên tố)
// Theo định lý Fermat nhỏ: a^(p-1) ≡ 1 (mod p)
// => a^(-1) ≡ a^(p-2) (mod p)
long long mod_inv(long long a, long long mod) {
    return power(a, mod - 2, mod);
}

// Tổ hợp C(n,k) mod p
// Tiền xử lý fact[] và inv_fact[]
const int MAXN = 1000005;
long long fact[MAXN], inv_fact[MAXN];

void precompute(int n) {
    fact[0] = 1;
    for (int i = 1; i <= n; i++) fact[i] = fact[i-1] * i % MOD;
    inv_fact[n] = mod_inv(fact[n], MOD);
    for (int i = n-1; i >= 0; i--) inv_fact[i] = inv_fact[i+1] * (i+1) % MOD;
}

long long C(int n, int k) {
    if (k < 0 || k > n) return 0;
    return fact[n] * inv_fact[k] % MOD * inv_fact[n-k] % MOD;
}

int main() {
    precompute(1000000);
    
    cout << power(2, 10, MOD) << "\n";  // 1024
    cout << C(10, 3) << "\n";           // 120
    cout << C(1000000, 500000) << "\n"; // Một số lớn mod 10^9+7
}`,
              }
            }
          ]
        },
        {
          id: 'strings-algo',
          title: 'Thuật toán chuỗi',
          lessons: [
            {
              id: 'kmp',
              title: 'KMP — Tìm kiếm chuỗi',
              time: '70 phút',
              tags: ['Chuỗi', 'Quan trọng'],
              content: {
                explain: `<p>KMP (Knuth-Morris-Pratt) tìm pattern trong text trong O(n+m), thay vì O(n*m). Bí quyết: khi match thất bại, không quay lại từ đầu mà nhảy đến vị trí đúng.</p>`,
                code: `#include <bits/stdc++.h>
using namespace std;

// Xây dựng bảng thất bại (failure function)
// fail[i] = độ dài prefix = suffix dài nhất của s[0..i]
vector<int> build_fail(const string& pat) {
    int m = pat.size();
    vector<int> fail(m, 0);
    for (int i = 1; i < m; i++) {
        int j = fail[i-1];
        while (j > 0 && pat[i] != pat[j]) j = fail[j-1];
        if (pat[i] == pat[j]) j++;
        fail[i] = j;
    }
    return fail;
}

// Tìm tất cả vị trí xuất hiện của pat trong text
vector<int> kmp(const string& text, const string& pat) {
    auto fail = build_fail(pat);
    int n = text.size(), m = pat.size();
    vector<int> positions;
    int j = 0;
    for (int i = 0; i < n; i++) {
        while (j > 0 && text[i] != pat[j]) j = fail[j-1];
        if (text[i] == pat[j]) j++;
        if (j == m) {
            positions.push_back(i - m + 1); // Tìm thấy tại i-m+1
            j = fail[j-1];
        }
    }
    return positions;
}

// Z-function — Cách tiếp cận khác, cũng O(n)
// z[i] = độ dài xâu dài nhất bắt đầu từ i mà là prefix của s
vector<int> z_function(const string& s) {
    int n = s.size();
    vector<int> z(n, 0);
    z[0] = n;
    int l = 0, r = 0;
    for (int i = 1; i < n; i++) {
        if (i < r) z[i] = min(r-i, z[i-l]);
        while (i+z[i] < n && s[z[i]] == s[i+z[i]]) z[i]++;
        if (i+z[i] > r) { l = i; r = i+z[i]; }
    }
    return z;
}

int main() {
    string text = "aababcabcababd";
    string pat = "abab";
    
    auto pos = kmp(text, pat);
    for (int p : pos) cout << p << " "; // Vị trí xuất hiện
    cout << "\n";
    
    // Tìm chuỗi lặp ngắn nhất
    string s = "ababababab";
    auto z = z_function(s);
    // Chuỗi lặp = s[0..k-1] nếu n % k == 0 và z[k] == n-k
}`,
              }
            }
          ]
        }
      ]
    }
  ],

  problems: [
    {
      id: 'p1', title: 'Tổng mảng', difficulty: 'easy', topic: 'Mảng',
      desc: 'Cho mảng n số nguyên. Tính tổng của mảng.',
      input: 'Dòng 1: n. Dòng 2: n số.',
      output: 'Tổng của mảng.',
      examples: [
        { input: '5\n1 2 3 4 5', output: '15' },
        { input: '3\n-1 0 1', output: '0' },
      ],
      starter: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    // Code ở đây
    return 0;
}`,
      solution: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        sum += x;
    }
    cout << sum << "\n";
}`,
      complexity: 'O(n)',
      hints: ['Dùng vòng lặp for để đọc và cộng dần', 'Dùng long long đề phòng tổng lớn']
    },
    {
      id: 'p2', title: 'Số nguyên tố', difficulty: 'easy', topic: 'Số học',
      desc: 'Kiểm tra n có phải số nguyên tố không.',
      input: 'Số nguyên n (1 ≤ n ≤ 10^9)',
      output: 'YES hoặc NO',
      examples: [
        { input: '17', output: 'YES' },
        { input: '4', output: 'NO' },
      ],
      starter: `#include <bits/stdc++.h>
using namespace std;
int main() {
    long long n; cin >> n;
    // Code ở đây
    return 0;
}`,
      complexity: 'O(√n)',
      hints: ['Thử chia n cho mọi số từ 2 đến √n', 'Nếu không chia hết cho số nào thì là số nguyên tố']
    },
    {
      id: 'p3', title: 'Cặp tổng target', difficulty: 'medium', topic: 'Two Pointers',
      desc: 'Cho mảng n số nguyên đã sắp xếp tăng dần và số k. Đếm số cặp (i,j) với i<j và a[i]+a[j]=k.',
      input: 'Dòng 1: n k. Dòng 2: mảng n phần tử đã sort.',
      output: 'Số cặp thỏa mãn.',
      examples: [
        { input: '7 9\n1 2 3 4 5 6 7', output: '3' },
      ],
      starter: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, k; cin >> n >> k;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    // Dùng two pointers
    return 0;
}`,
      complexity: 'O(n)',
      hints: ['Dùng two pointers: lo=0, hi=n-1', 'Nếu tổng < k: lo++. Nếu tổng > k: hi--. Nếu bằng: cả hai dịch vào']
    },
    {
      id: 'p4', title: 'Số Fibonacci thứ n', difficulty: 'easy', topic: 'DP',
      desc: 'Tính số Fibonacci thứ n (F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2)).',
      input: 'Số nguyên n (0 ≤ n ≤ 80)',
      output: 'F(n) mod 10^9+7',
      examples: [
        { input: '10', output: '55' },
        { input: '0', output: '0' },
      ],
      starter: `#include <bits/stdc++.h>
using namespace std;
const long long MOD = 1e9+7;
int main() {
    int n; cin >> n;
    // Code ở đây
    return 0;
}`,
      complexity: 'O(n)',
    },
    {
      id: 'p5', title: 'BFS — Khoảng cách ngắn nhất', difficulty: 'medium', topic: 'Đồ thị',
      desc: 'Đồ thị vô hướng không trọng số n đỉnh m cạnh. Tìm khoảng cách ngắn nhất từ đỉnh 1 đến mọi đỉnh.',
      input: 'Dòng 1: n m. Tiếp theo m dòng: u v.',
      output: 'n số: khoảng cách từ 1 đến đỉnh 1,2,...,n. -1 nếu không đến được.',
      examples: [
        { input: '5 4\n1 2\n2 3\n3 4\n1 5', output: '0 1 2 3 1' },
      ],
      starter: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n, m; cin >> n >> m;
    vector<vector<int>> adj(n+1);
    for (int i = 0; i < m; i++) {
        int u, v; cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    // BFS từ đỉnh 1
    return 0;
}`,
      complexity: 'O(V+E)',
      hints: ['Dùng queue, khởi tạo dist[1]=0', 'Khi thăm đỉnh u, cập nhật dist[v]=dist[u]+1 cho mọi v chưa thăm']
    },
    {
      id: 'p6', title: 'Dãy tăng dài nhất (LIS)', difficulty: 'hard', topic: 'DP',
      desc: 'Tìm độ dài dãy con tăng nghiêm ngặt dài nhất.',
      input: 'Dòng 1: n. Dòng 2: n số nguyên.',
      output: 'Độ dài LIS.',
      examples: [
        { input: '8\n3 1 8 2 5 4 7 6', output: '4' },
      ],
      starter: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int n; cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    // O(n log n)
    return 0;
}`,
      complexity: 'O(n log n)',
      hints: ['Dùng mảng tails và lower_bound', 'tails[i] = phần tử nhỏ nhất kết thúc LIS dài i+1']
    }
  ]
};
