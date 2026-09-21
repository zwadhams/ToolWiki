---
title: "ThreadSanitizer (Clang)"
description: "Detect data races during executions of instrumented multithreaded C and C++ programs."
tool:
  modes: ["Dynamic"]
  inputTypes: ["Binaries"]
  techniques: ["Runtime race detection","Sanitizer instrumentation"]
  languages: ["C","C++"]
  languageNote: "This entry covers the Clang C/C++ runtime. Go's race detector is a separate toolchain integration and is not included in these language tags."
  targets: ["Multithreaded native programs"]
  findings: ["Concurrency issues"]
  findingNote: "Finds observed conflicting memory accesses without the required synchronization. It is not a general detector of deadlocks, scheduling bugs, or all concurrency failures."
  environment: "Supported 64-bit OS/CPU pairs include Linux, macOS, Android, FreeBSD, and NetBSD. The Clang documentation does not list native Windows support."
  setup: "Compile and link with ThreadSanitizer and run a workload that exercises shared state. Instrument relevant libraries and use supported synchronization; plan separate ASan and TSan builds."
  licenseCategory: "Open source"
  license: "Apache-2.0 WITH LLVM-exception for current LLVM compiler-rt; some components retain other notices"
  cost: ["Free"]
  costNote: "Free compiler/runtime component. The instrumented program can require substantially more time and memory."
  website: "https://clang.llvm.org/docs/ThreadSanitizer.html"
  verified: "2026-09-21"
  scope: "Clang/LLVM ThreadSanitizer C/C++ data-race checking. Target support and synchronization modeling depend on the compiler/runtime release."
  sources:
    - label: "Clang usage, supported targets, and limitations"
      url: https://clang.llvm.org/docs/ThreadSanitizer.html
    - label: "C/C++ race detection guide and instrumentation requirements"
      url: https://github.com/google/sanitizers/wiki/ThreadSanitizerCppManual
    - label: "Runtime licensing"
      url: https://github.com/llvm/llvm-project/blob/main/compiler-rt/LICENSE.TXT
---

## When to use it

Use ThreadSanitizer when multiple threads access shared data and you need evidence about synchronization. A memory-bounds checker answers a different question; a valid address can still participate in a race.

## Worked example: two unsynchronized writers

**Illustrative example, not run here.** Save `race.cpp` on a supported Clang C++ host:

```cpp
#include <thread>
int counter = 0;
void increment() {
    for (int i = 0; i < 1000; ++i) ++counter;
}
int main() {
    std::thread first(increment);
    std::thread second(increment);
    first.join();
    second.join();
}
```

Build and execute the test:

```sh
clang++ -std=c++17 -O1 -g -fsanitize=thread -pthread race.cpp -o race
./race
```

Look for a data-race report with the conflicting accesses and their threads. A meaningful correction is synchronization, such as a mutex or an appropriately designed atomic operation. Merely obtaining the expected final count would not establish race freedom.

## Limits

Results depend on the exercised workload and the synchronization the runtime can observe. Missing instrumentation or broad suppressions can obscure relevant events. An execution with no report is not a proof for every possible schedule.

Use a separate build from [AddressSanitizer](../address-sanitizer/) when evaluating both kinds of defects.
