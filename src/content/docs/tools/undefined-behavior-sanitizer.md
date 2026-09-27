---
title: UndefinedBehaviorSanitizer (Clang)
description: Detect selected undefined behavior while executing instrumented C and C++ programs.
tool:
  aliases: [UBSan, Undefined Behavior Sanitizer]
  searchTerms: [undefined behaviour, signed integer overflow, integer divide by zero, invalid shifts, misaligned pointers]
  modes: [Dynamic]
  inputTypes: [Binaries]
  techniques: [Sanitizer instrumentation, Runtime undefined behavior checking]
  languages: [C, C++]
  languageNote: Clang/LLVM C and C++ workflows; check availability depends on the compiler and target.
  targets: [Native programs, Libraries]
  findings: [Undefined behavior, Memory safety]
  findingNote: Selected arithmetic, pointer, and bounds checks on executed code. It does not detect every form of undefined behavior.
  environment: Supported Clang/runtime targets include Linux, macOS, Windows, Android, and several BSD systems.
  setup: Compile and link with the selected sanitizer flags, then run tests or another workload. Reporting modes require the appropriate runtime libraries; trap mode differs.
  licenseCategory: Open source
  license: Apache-2.0 WITH LLVM-exception for current LLVM compiler-rt, with retained component notices
  cost: [Free]
  costNote: Free compiler/runtime component. Instrumented builds and test execution consume local or CI resources.
  website: https://clang.llvm.org/docs/UndefinedBehaviorSanitizer.html
  verified: '2026-09-26'
  scope: Clang UBSan, focused on the undefined check group. Other compiler implementations and additional check groups have separate limits.
  sources:
    - label: Checks, usage, and supported targets
      url: https://clang.llvm.org/docs/UndefinedBehaviorSanitizer.html
    - label: Sanitizer flags and runtime linking
      url: https://clang.llvm.org/docs/UsersManual.html
    - label: Runtime licensing
      url: https://github.com/llvm/llvm-project/blob/main/compiler-rt/LICENSE.TXT
---

## Where it fits

Use UBSan to make selected arithmetic and pointer mistakes visible during tests. Compare [AddressSanitizer](../address-sanitizer/) for other memory errors and [ThreadSanitizer](../thread-sanitizer/) for data races.

## Worked example: signed overflow

**Illustrative example, not run here.** Save this as `overflow.c` in a Clang environment with UBSan support:

```c
#include <limits.h>

int main(void) {
    volatile int largest = INT_MAX;
    return largest + 1;
}
```

In a Unix-style shell, build and exercise it:

```sh
clang -O0 -g -fsanitize=undefined -fno-sanitize-recover=undefined overflow.c -o overflow
./overflow
```

Expect a signed-overflow diagnostic and a failing execution. This is an intended outcome, not captured output. Replacing the addition with `largest - 1` removes this example's overflow.

## Interpret the result

The `undefined` group is not every available check; unsigned overflow, for example, requires separate selection. Compiler flags control recovery and trap behavior.

Keep the workload and build flags with each result. A clean run says nothing about paths that were not exercised. [Compare the three sanitizers](../../compare/?tools=tools%2Faddress-sanitizer%2Ctools%2Fundefined-behavior-sanitizer%2Ctools%2Fthread-sanitizer), or read the [memory-checking workflow](../../guides/memory-error-detection/).
